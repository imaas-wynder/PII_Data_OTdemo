const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const AppServer = require('../src/AppServer').default;

const app = express();
const PORT = process.env.PORT || 3001;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  console.log('GET req.params: ', req.params)
  console.log('GET req.query: ', req.query)
  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>App Server</title>
      </head>
      <body>
        <div id="root">You've reached the Risk Guard Demo Server</div>
      </body>
    </html>`;

  res.send(html);
});

app.post('/', (req, res) => {
  const data = req.body
  const content = ReactDOMServer.renderToString(<AppServer data={data} />);
  res.send(content)
  res.end()
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
