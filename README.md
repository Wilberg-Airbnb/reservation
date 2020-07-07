# Reservation

> Reservation Service widget for Airbrb FEC project

## Related Projects

- https://github.com/Wilberg-Airbnb/reviews
- https://github.com/Wilberg-Airbnb/description
- https://github.com/Wilberg-Airbnb/location
- https://github.com/Wilberg-Airbnb/sam-johnson-proxy

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

> Please run 'npm run server:dev' to serve application on localhost:5000.
> bundle will serve on http://localhost:5000/public/bundle.js.
> To retrieve reservation data for listing, use endpoint http://localhost:5000/api/reservation/:listingId.
> To seed database, please add schema.sql file via MySQL & update createConnection to match your login in the db/index.js file.
  - Once the schema has been loaded and connection made, you can run 'npm run seed' to seed your new airbrbRes database with example data.
  - If you for any reason want to generate your own randomized data, then you can run 'npm run generator' before seeding.

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- mysql ^2.18.1
- React ^16.13.1
- Webpack ^4.43.0

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
