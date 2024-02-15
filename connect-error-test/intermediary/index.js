const http = require("node:http");
const {
  createConnectTransport,
  connectNodeAdapter,
} = require("@connectrpc/connect-node");
const { createPromiseClient } = require("@connectrpc/connect");
const { ElizaService, routes } = require("./connect.js");

let server;
async function say(req) {
  server = http.createServer(connectNodeAdapter({ routes }));
  await new Promise((resolve, reject) => {
    server.listen((error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
  const address = server?.address();
  if (typeof address !== "object" || address === null) {
    throw new Error("cannot get server port");
  }

  const client = createPromiseClient(
    ElizaService,
    createConnectTransport({
      baseUrl: `http://0.0.0.0:${address.port}`,
      httpVersion: "1.1",
    }),
  );
  return client.say(req);
}

function stopServer() {
  server.close();
}

module.exports = {
  say,
  stopServer,
};
