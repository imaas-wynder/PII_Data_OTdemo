import React from 'react';
import axios from 'axios';
import {properties} from './properties';

function App() {
  const [accessToken, setAccessToken] = React.useState()
  const [tokenPlaceholder, setTokenPlaceholder] = React.useState()

  const [piiData, setPiiData] = React.useState()
  const [piiDataPlaceholder, setPiiDataPlaceholder] = React.useState()

  const [file, setFile] = React.useState({  
    name: "",
    size: "",
    type: ""
  })

  const [captureFile, setCaptureFile] = React.useState({
    name: ""
  })

  const [capturedFileId, setCapturedFileId] = React.useState("")  //id of image file in Capture Service
  const [extractedData, setExtractedData] = React.useState()
  const [extractedDataDisplay, setExtractedDataDisplay] = React.useState()

  const [capFileIdPlaceholder, setCapFileIdPlaceholder] = React.useState("")

  const [retrieveStatus, setRetrieveStatus] = React.useState("")
  const [retrieveCaptureStatus, setRetrieveCaptureStatus] = React.useState("")
  const [retrieveSendToDBStatus, setRetrieveSendToDBStatus] = React.useState("")

  const [tmeResults, setTMEResults] = React.useState([])


  /**
   * Step 1 - getAuthToken() - Get Authentication Token from OCP
   */
  async function getAuthToken() {
    setAccessToken("")
    setTokenPlaceholder("...Requesting New Authentication Token")

    const url = `${properties.base_url}/tenants/${properties.tenant_id}/oauth2/token`
    const requestOptions = {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            client_id: properties.client_id,
            client_secret: properties.client_secret,
            grant_type: "password",
            username: properties.username,
            password: properties.password
        })
    }

    const response = await fetch(url, requestOptions)

    if (!response.ok) {
      setTokenPlaceholder("Error acquiring authentication token")
      alert("Authentication Failed. Please verify your credentials in properties.js")
      return
    }
    const data = await response.json()
    setAccessToken(data.access_token)
    setTokenPlaceholder("")
  }

  /**
   * Step 2A - handleFileForRiskGuard() - Read the file selected by the user
   */
    function handleFileForRiskGuard(event) {
      setPiiData("")
      setPiiDataPlaceholder("")
      setRetrieveStatus("")

      setFile(event.target.files[0])
    }
   
  /**
   * Step 2B - handleUploadToRiskGuard() - Upload the Text Searchable PDF file to RiskGuard Service
   */
  function handleUploadToRiskGuard() {
    setPiiData("")
    setPiiDataPlaceholder("")
    setTMEResults("")

    if (!accessToken) {
      alert("Missing Authentication Token")
      return
    }

    if (!file.name) {
      setRetrieveStatus("...No file selected")
      return
    }

    setRetrieveStatus("...Processing Text Mining")

    let formData = new FormData();
    formData.append('File', file, file.name);

    let options = {
      url: `${properties.base_url}/mtm-riskguard/api/v1/process`,
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${accessToken}`, 
        'Accept': "application/json",
        'Content-Type': "multipart/form-data"
      },
      data: formData
    }

    axios(options)
      .then(response => {
        if (!response.data.results.tme.result) {
          setRetrieveStatus("...No seachable PII data found")
          return
        }

        setRetrieveStatus("..."+response.data.header.status.description)
        setTMEResults(response.data.results.tme.result.Results.nfinder[0].nfExtract[0].ExtractedTerm)
      })
      .catch(error => {
        if (error.response.status === 401) {
          setRetrieveStatus("...Authentication Token has expired. Please obtain a new token.")
        }
        else {
          setRetrieveStatus("..."+error.message)

        }
      })
  }

  /**
   * Step 2C - displayPiiData() - Display PII data identified by RiskGuard 
   */
  function displayPiiData() {
    setPiiData("")
    setPiiDataPlaceholder("")

    if (tmeResults.length === 0) {
      setPiiDataPlaceholder("...No PII data to display")
    }
    else {
      let pii = ""
      setPiiData(tmeResults.map(extractedTerm => {
        pii += `${extractedTerm.CartridgeID} = ${extractedTerm.Subterms.Subterm[0].value}\n`
      }))
      setPiiData(pii)
    }
  }



  /**
   * Step 3A - handleFileForCapture() - Read the file selected by the user
   */
   function handleFileForCapture(event) {
    setCapturedFileId("")
    setCapFileIdPlaceholder("")
    setRetrieveCaptureStatus("")
    setExtractedDataDisplay("")

    setCaptureFile(event.target.files[0])
  }

  /**
   * Step 3B - handleUploadToCapture() - Upload the file to Capture Service
   */
  function handleUploadToCapture() {
    setCapturedFileId("")
    setRetrieveCaptureStatus("")
    setExtractedDataDisplay("")

    if (!accessToken) {
      alert("Missing Authentication Token")
      return
    }

    if (!captureFile.name) {
      setCapFileIdPlaceholder("No file selected")
      return
    }
  
    setCapFileIdPlaceholder("Processing...")
    
    const url = `${properties.base_url}/capture/cp-rest/v2/session/files`
    const fetchOptions = {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': "application/hal+json",
        'Accept-Language': "en-US",
        'Content-Type': captureFile.type,
        'Content-Length': captureFile.size
      },
      body: captureFile
    }

    fetch(url, fetchOptions)
      .then(response => response.json())
      .then(data => setCapturedFileId(data.id))
      .catch(error => console.error("Error: ", error))
  }

  /**
   * Step 3C - extractData() - Extract data from the (image) file uploaded to Capture Service
   */
  async function extractData() {
    setExtractedDataDisplay("")
    setRetrieveSendToDBStatus("")

    if (!capturedFileId) {
      setRetrieveCaptureStatus("...No file uploaded to Capture Service")
      return
     }

    setRetrieveCaptureStatus("...Processing Data Extraction (please wait)")

    const fileName = captureFile.name.substring(0, captureFile.name.lastIndexOf('.')) || captureFile.name
    const fileExt  = captureFile.name.substring(captureFile.name.lastIndexOf('.')+1) || ''

    const url = `${properties.base_url}/capture/cp-rest/v2/session/services/classifyextractpage`
    const fetchOptions = {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': "application/hal+json",
        'Accept-Language': "en-US",
        'Content-Type': "application/hal+json"
      },
      body: JSON.stringify({
        "serviceProps": [
          {"name": "Env","value": "D"},
          {"name": "IncludeOcrData","value": false},
          {"name": "Project","value": "InformationExtraction"}
        ],
        "requestItems": [
          {
            "nodeId": 1,
            "values": null,
            "files": [
              {
                "name": `${fileName}`,
                "value": `${capturedFileId}`,
                "contentType": `${captureFile.type}`,
                "fileType": `${fileExt}`
              }
            ]
          }
        ]
      })
    }

    const response = await fetch(url, fetchOptions)
    const data = await response.json()

    const values = data.resultItems[0].values;

    const docType = values.find(({name}) => name === "DocumentTypeName")
    const UimData = values.find(({name}) => name === "UimData")

    setExtractedData(UimData.value.nodeList)
    
    if (UimData.value.nodeList.length === 0) {
      setRetrieveCaptureStatus("...Completed analyzing '" + captureFile.name + "'")
      setExtractedDataDisplay("No data could be extracted from the selected file. Please use the image file provided for this example.")
      return
    }

    setExtractedDataDisplay(JSON.stringify(UimData.value.nodeList, "", 2))
    setRetrieveCaptureStatus("...Completed analyzing '" + docType.value + "' lab report")
  }


  /**
   * Step 4 - sendToDBServer() - Insert the extracted data into a relational database
   */
  async function sendToDBServer() {
    if (!extractedData) {
      setRetrieveSendToDBStatus("...No data to insert into database")
      return
    }

    setRetrieveSendToDBStatus("...Sending extracted data to Database (please wait)")

    const url = properties.server_url
    axios.post(url, extractedData)
    .then(res => {
      setRetrieveSendToDBStatus("..."+res.data)
    })
    .catch(error => {
      setRetrieveSendToDBStatus("..."+error.message)
    })
  }


  /***********************
   * Render page
   **********************/
  return (
      <main>
        <h1 className="ot2-sample-header">Safeguarding PII/PHI with Risk Guard</h1><br/>
        <div className="ot2-body">
          <div>
            <h3>1. Use Authentication API to obtain Access Token</h3>
            <button onClick={getAuthToken}>Get Token</button>&nbsp;&nbsp;&nbsp;
            <label><i>{tokenPlaceholder}</i></label> <br/><br/>
            <textarea id="token" name="token" value={accessToken} rows="8" cols="63" readOnly /><br/><br/>
          </div>
          <hr align='left' />

          <div>
            <h3>2. Use Risk Guard Service to extract PII data from a "Lab Report" searchable pdf</h3>
            <label><b>Step 1: </b></label>&nbsp;
              <label className="fileButton" htmlFor="upload">Select File
                <input id="upload" type="file" accept="image/*, .pdf" onChange={handleFileForRiskGuard} />
              </label>
            <label>&nbsp;&nbsp;&nbsp; File Name: </label>
            <input type="text" name="fileName" value={file.name} size="35" readOnly/><br/><br/>

            <label><b>Step 2: </b></label>&nbsp;
            <button onClick={handleUploadToRiskGuard}>Process File</button>&nbsp;&nbsp;&nbsp; 
            <label><i>{retrieveStatus}</i></label><br/><br/>

            <label><b>Step 3: </b></label>&nbsp;
            <button onClick={displayPiiData}>Display PII Data</button> &nbsp;&nbsp;&nbsp;
            <label><i>{piiDataPlaceholder}</i></label> <br/><br/>
            <textarea id="piiData" name="piiData" value={piiData} rows="7" cols="63" readOnly /><br/><br/>
          </div>
          <hr align='left' />

          <div>
            <h3>3. Use Capture Service to extract data from a "Lab Report" pdf document</h3>
            <label><b>Setp 1: </b></label>&nbsp;
              <label className="fileButton" htmlFor="readCaptureFile">Select File
                <input id="readCaptureFile" type="file" accept="image/*, .pdf" onChange={handleFileForCapture} />
              </label>
            <label>&nbsp;&nbsp;&nbsp; File Name: </label>
            <input type="text" name="captureFileName" value={captureFile.name} size="35" readOnly/><br/><br/>

            <label><b>Setp 2: </b></label>&nbsp;
            <button onClick={handleUploadToCapture}>Upload File</button>&nbsp;&nbsp; 
            <label htmlFor='capturedFileId'>&nbsp;&nbsp; File Id: </label>
            <input type="text" name="capturedFileId" value={capturedFileId} placeholder={capFileIdPlaceholder} size="35" readOnly/><br/><br/>

            <label><b>Setp 3: </b></label>&nbsp;
            <button onClick={extractData}>Extract Data from File</button>&nbsp;&nbsp;&nbsp; 
            <label><i>{retrieveCaptureStatus}</i></label> <br/><br/>
            <textarea id="extractedData" name="extractedData" value={extractedDataDisplay} rows="8" cols="63" readOnly /><br/><br/>
          </div>
          <hr align='left' />

          <div>
            <h3>4. Insert data extracted by Capture Service into a Relational Database</h3>
            <button onClick={sendToDBServer}>Send Data To Database</button>&nbsp;&nbsp; 
            <label><i>{retrieveSendToDBStatus}</i></label> <br/><br/>
          </div>
          <hr align='left' />

        </div>
      </main>
  );
}

export default App;
