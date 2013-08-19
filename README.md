# Seshun

Seshun is a scalable session service. The API describes a RESTful interface for interacting with sessions stored in Seshun.

## Usage

To startup the Seshun server

``` bash
$ seshun
```

To startup the Seshun server with debug logging
``` bash
$ DEBUG=* seshun
```

### Terminology

 - **client app:** an application that stores some data in seshun
 - **session:** a blob of user data that’s stored in seshun by a client app
 - **bucket:** a way for client apps to segment their data apart from other client apps. Not a reference to any particular implementation that uses "bucket" terminology.
 - **id:** a Universally Unique Identifier (UUID)
 - **API key:** authentication mechanism to prevent tampering of data by unauthorized / anonymous clients.

### Basic Rest-y Interface

A session is accessed via standard HTTP / REST verbs.

| Action | URI | Description | Response |
|--------|-----|-------------|----------|
| Any | All | Any method + URL mismatches will respond with a 405 Method Not Allowed | 405 Method Not Allowed |
| Any | All | Any request made without a valid API key will respond with a 401 Not Authorized | 401 Not Authorized |
| PUT | /session/bucket | Create a new session | 201 Created on success |
| GET | /session/bucket/id | Retrieve session data corresponding to the specified id, extend TTL | 200 Success; 404 Not Found if `id` is missing |
| POST | /session/bucket/id | Update session data that corresponds to the specified id, extend TTL | 200 Success; 404 Not found if `id` is missing |
| DELETE | /session/bucket/id | Delete a session that corresponds to the specified id | 200 OK on success; 404 Not Found if `id` is missing / already deleted |

### API Keys

API keys are sent via a header (X-API-KEY).

If the API key is not valid, the client will receive a 401 Not Authorized header.

### API Key API

One or more master API key are configured in the seshun config file. Changing these requires a server restart. Requests made to the /api-key/ endpoint using these API keys can be used to make new bucket + API key pairs for clients.

| Action | URI | Description | Response |
|--------|-----|-------------|----------|
| PUT  | /api-key/bucket | Responds with new API key | 201 Created on success; 409 Conflict on duplicate bucket name |
| POST | /api-key/bucket | invalid | 405 Method Not Allowed |
| GET  | /api-key/bucket | Responds with the current API key | 200 OK on success |
| DELETE | /api-key/bucket | used to delete an API key | 200 OK on success

A key regeneration operation is handled via DELETE and PUT. This emphasizes the destructive / service-interruptive nature of the change, and leaves key generation methods to the server.

### Inside a Session

Each session contains a few pieces of information:

- Bucket Name - which application / bucket this session is associated with
- UUID - unique identifier for this session
- Expiration Time - when the session will expire. A POST or GET will extend the session expiration time.
- Data Blob - string containing session data from the client app

### Runtime Configuration

Seshun defaults to the following runtime configuration values:

- 1mb session payload
- 30 day session TTL

See the `config.yml` to change them.

GET /session/settings will expose settings from `config.yml` like session TTL and payload size.
