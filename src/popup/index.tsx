import React, { FunctionComponent } from 'react';
import { render } from 'react-dom';
import { encode } from 'base64-arraybuffer';


const subtle = window.crypto.subtle;
// @ts-ignore typescript doesn't know about the browser object
const storage = browser.storage;
//const url = "http://localhost:4000"

const Root: FunctionComponent = () => {
  const sendPublicKey = async () => {
    const publicKey = await storage.local.get("publicKey");
    console.log(publicKey);


  }

  const generateKeys = async () => {
    let keyPair = await subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256"
      },
      true,
      ["encrypt", "decrypt"]
    );
    console.log("Generated");


    if (keyPair.publicKey && keyPair.privateKey) {
      const publicKey = encode(await subtle.exportKey("spki", keyPair.publicKey));
      const privateKey = encode(await subtle.exportKey("pkcs8", keyPair.privateKey));
      storage.local.set({publicKey, privateKey});
      console.log("finished storing keys");
    } else {
      console.log("no key");
    }
  }

  const readKeys = async () => {
    console.log("Try to read data");
    const value = await storage.local.get("foo");
    console.log(value);
  }

  readKeys();

  return (
    <>
      <h1>Hello, world!</h1>
      <button onClick={generateKeys}>Generate Keys</button>
      <button onClick={sendPublicKey}>Send Public Key</button>
    </>
  );
};

render(<Root />, document.getElementById('root'));
