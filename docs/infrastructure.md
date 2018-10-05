# Infrastructure

This will be a next.js based project to keep things fast and simple.

Auth will be managed via passport (potentially look into Auth0 integration, if a free tier exists?).

DB will either be mongodb or postgres or sqlite, again for speed and simplicity.

The site will be hosted on a digital ocean droplet, with both staging (<http://staging.shentaria.com>) and production (<http://shentaria.com>) environments.

CI/CD will be handled via [circleci](https://circleci.com/).

Maptiles will be published to an AWS S3 bucket, with each map living under its own path on S3. S3 will be fronted by cloudfront as a caching layer potentially.

API server and next.js server that serves the actual front end will be kept separate to separate out concerns.
