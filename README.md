<h1 align="center" style="font-size: 1.7em;"><strong>React, SemanticUI, Apollo Client, and GraphQL Starter With Authentication</strong></h1>

## Getting started

1.  Create a mysql database called starter_development or use a dirrerent name and update `development.database` in `server/config/config.json` to reflect the new name
2.  Run `yarn` or `npm i` inside the server and client folders
3.  In the server folder, create a file called .env and copy/paster the contents from .env.example to .env
4.  Run `yarn start` or `npm start` from the client and server folders

## Notes

This project aims to provide a quick way to test out ideas and prototypes. Additional work should be done on authentication and security. Ideally, the jwt should expire quickly, and optionally a refresh token pattern should be implemented.

TODO

- [x] Need to refactor client to use the latest apollo client API with `<Mutation></Mutation>` and <`Query></Query>`
- [x] Handle component errors on the client
- [ ] Use optimistic creates to improve the responsiveness of the UI when creating a task
- [ ] Handle global client errors
- [ ] Integrate Travis CI for automated tests
- [ ] Setup reset password and forgot password (with the exception of emails)
- [ ] Add more test coverage
