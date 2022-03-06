console.log("background");
// @ts-ignore typescript doesn't know about the browser object
const storage = browser.storage;

async function foo(){
  console.log("getting public key");
  const value = await storage.local.get("publicKey");
  console.log(value);
}
foo()
