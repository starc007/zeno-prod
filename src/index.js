import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { MoralisProvider } from "react-moralis";

const appId = "XTbxGe1cb5iTREgO4tW6VOPPAENTSDIgzJt3sZC5";
const serverUrl = "https://xglkvgmlvcls.usemoralis.com:2053/server";

ReactDOM.render(
  <MoralisProvider appId={appId} serverUrl={serverUrl}>
    <App />
  </MoralisProvider>,
  document.getElementById("root")
);
