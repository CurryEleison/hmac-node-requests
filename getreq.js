// Borrowd from https://stackoverflow.com/questions/49495333/nodejs-equivalent-of-c-sharp-code-for-hmac-sha256-authorization
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import {createHmac} from 'crypto';
import nodeConfig from 'config';

// Config and input
const args = process.argv.slice(2);
const appId = nodeConfig.get("auth.appId");
const secretKey = nodeConfig.get("auth.secretKey")

// Figure out what request we want to perform
const url = args[0] ? args[0] : nodeConfig.get("req.defaultUrl");
const requestHttpMethod = "GET";

// Calculate HMAC
const requestUri = encodeURIComponent(url).toLowerCase();
const requestTimeStamp = Math.floor(new Date().getTime() / 1000).toString();
const nonce = uuidv4().replace(/-/g, '');
const signatureRawData = appId + requestHttpMethod + requestUri + requestTimeStamp + nonce;
const key = Buffer.from(secretKey, 'base64');
const requestSignatureBase64String = createHmac('sha256', key).update(signatureRawData, 'utf8').digest('base64');

// Send Request
const hitExternalAPI = async url => {
  try {
    const res = await fetch(url, { method: requestHttpMethod, headers: { "Authorization": "amx "+appId+":"+requestSignatureBase64String+":"+nonce+":"+requestTimeStamp } })
    .then(res => {
      console.log(res.ok);
    });
  } catch (error) {
    console.log("Error",error);
  }
};
hitExternalAPI(url);
