# HABIT APP BACKEND :rocket:

Just Git clone, yarn install, yarn start

# App Structure

## Express Middlewares

All Express dependencies exists in the `/src/middlewares/index.js` file. So anytime you install a module that needs the express `app.use()` function, just add the module/middleware inside the middlewares array and thats all.

## Routing

All routes is handled by `index.js` file that exists inside the `/src/routes/index.js` file. You dont need to worry about adding routes anywhere, Just create the routeFile inside the `/src/route` directory and thats all. The `index.js` tracks all routes automatically.

## app.js

Well the `app.js` file in the `/src/app.js` is just responsible for initializing all routes, middlewares e.t.c.

## Which file is responsible for starting the server

The `index.js` in the `/src/index.js` file is responsible for that.

What does it do exactly?

Nothing much, it just tends to make sure that the database is connected before starting the server as this helps in production (Topology Expired Error).

## database.js

This is responsible for creating database connection. A `mongodb_url` specified in the `config/default.json` file.

## Environment Variables

Environment variables is handled by the `config-tiny` module. Thanks to @iamnasirudeen for that :blush:.

All environment keys should be specified in the `config/default.json` file. Note: do not move the config folder from the project root.

## libs

This folder is responsible for all custom made library e.g (file uploader).

## Base Url

    "http://localhost:3000"

## Endpoints

    note: make sure to pass token to header

    Create User:
        endpoint: (/user/create)
        method: post
        parameters:
            name (required, string),
            email (required, string),
            age (required, number),
            dateOfBirth (required, string)
            photograph (required, string)
            family(array, paramters(name (string) , relationship (string), age (number) ))

    Get All User:
        endpoint: (/users)
        method: get

    Get a User By Email:
        endpoint: (/user/:email)
        method: get
        parameters:
            email (required, string)
