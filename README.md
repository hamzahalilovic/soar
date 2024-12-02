This is a monorepo project with frontend and backend separated in two different folders.

Inside backend folder:
First install dependencies:

### `yarn install`

To run locally:

### `yarn dev`

Inside fronted folder:
First install dependencies:

### `yarn install`

To run locally:

### `yarn start`

## Frontend Scripts

In the project directory, you can run:

"start": "react-scripts start",
"build": "react-scripts build",
"test": "react-scripts test",
"eject": "react-scripts eject"

## Backend Scripts

In the project directory, you can run:

"dev": "nodemon server.js",
"start": "node server.js",
"start:local": "node -r dotenv/config server.js dotenv_config_path=.env.local",
"start:production": "node -r dotenv/config server-production.js dotenv_config_path=.env.production"



