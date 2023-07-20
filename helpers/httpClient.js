// showLastCommitMessageForThisLibrary.js
import { create } from "apisauce";

const baseUrlApp = `http://streaming.nexlesoft.com:3001`;

const apiInstance = create({
  baseURL: baseUrlApp,
  headers: { Accept: "application/vnd.github.v3+json" },
});

export default apiInstance;
