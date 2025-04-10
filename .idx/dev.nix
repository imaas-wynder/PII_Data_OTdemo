let
  pkgs = import <nixpkgs> {};
in
pkgs.mkShell {
  name = "riskguard-capture-dev";

  buildInputs = with pkgs; [
    nodejs_18
    nodePackages.npm
    # React development tools (adjust as needed)
    vscode-extensions.dbaeumer.vscode-eslint
    vscode-extensions.esbenp.prettier-vscode

    # Database service
    mysql80
  ];

shellHook = ''
   export PATH="/nix/store/i52w1ch1cb2ia9yh0brivwyl1crayw49-mysql-8.0.37/bin:$PATH"

  mkdir -p /tmp/mysql
  mysql_install_db --datadir=/tmp/mysql --basedir=/nix/store/i52w1ch1cb2ia9yh0brivwyl1crayw49-mysql-8.0.37

  # Start MySQL service in the background
  mysqld --datadir=/tmp/mysql &
  echo "MySQL started.  Run 'mysql -u root --socket /tmp/mysql.sock' to connect."

  # Set up Node.js environment (optional, adjust as needed)
  export PATH="./node_modules/.bin:$PATH"

  echo "Development environment for RiskGuard Capture Demo is ready."
  echo "Run 'npm install' to install project dependencies."
  echo "Run 'npm start' to start the client-side app."
  echo "In another terminal, run 'npm run build:server' and 'npm run start:server' to start the server."
'';
}