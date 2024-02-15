import { say, stopServer } from "intermediary";
import { ConnectError } from "@connectrpc/connect";

(async function callIntermediary() {
  try {
    await say({ sentence: "fail" });
  } catch (e) {
    if (e instanceof ConnectError) {
      console.log("OK");
    } else {
      console.log("FAIL");
    }
  }
  stopServer();
})();
