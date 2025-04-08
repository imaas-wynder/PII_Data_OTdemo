
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
    export HOME=/home/user

    # Start MySQL service in the background
    mysqld &
    echo "MySQL started.  Run 'mysql -u root --socket /tmp/mysql.sock' to connect."

    # Set up Node.js environment (optional, adjust as needed)
    export PATH="./node_modules/.bin:$PATH"

    echo "Development environment for RiskGuard Capture Demo is ready."
    echo "Run 'npm install' to install project dependencies."
    echo "Run 'npm start' to start the client-side app."
    echo "In another terminal, run 'npm run build:server' and 'npm run start:server' to start the server."
  '';

  # Optional:  If you need to initialize the database, you can add commands here.
  # For example:
  #
  #    mysql_init_command = ''
  #      mysql -u root --socket /tmp/mysql.sock < db_scripts/create_database_imservicesdb.sql
  #    '';
}