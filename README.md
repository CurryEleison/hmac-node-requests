# HMAC Request Tester

Use to run requests against services secured by HMAC auth in the style of 
https://bitoftech.net/2014/12/15/secure-asp-net-web-api-using-api-key-authentication-hmac-authentication/ .
Code is from https://stackoverflow.com/questions/49495333/nodejs-equivalent-of-c-sharp-code-for-hmac-sha256-authorization .

## Status

Was used to access a particular migration endpoint. Project is finished
and this tool is no longer needed.

## Installation

Do an `npm install` to get dependencies. If you use a `NODE_ENV` then make a copy
of `config/default.json` to `config/$NODE_ENV.json` and edit it, to add the right
AppId and Api/Secret key and a url.

## Usage

When configured, to make a GET against the default url do

```sh
node getreq.js
```

If you want to do a GET request against a specific url do
```sh
node getreq.js https://apiserver.wherever.com/api/path/to/resource
```

For a POST request do

```sh
node postreq.js
```

To use a file as POST body against a specific resource:

```sh
node postreq.js https://apiserver.wherever.com/api/post/resource yourfile.json
```
