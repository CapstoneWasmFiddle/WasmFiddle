import express from "express";
import { existsSync } from "fs";
import { syncBuiltinESMExports } from "module";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { 
  compileToWasm, 
  createRandomFileWithData, 
  createDir, 
  deleteFile } from "./libs/fileInteractionFunctions.js";

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

app.post("/compile", async (req, res) => {
  // TODO - need to account for compilation options
  // currently assumes c/cpp 
  
  // create compiledCode dir
  if(!existsSync("./compiledCode")){
    createDir("../compiledCode");
  }

  // create and compile c file from retrieved source code 
  const fn = createRandomFileWithData(req.body.code);
  const __dirname = dirname(fileURLToPath(import.meta.url));

  // send standalone wasm file
  await compileToWasm(fn, "wasm");
  
  // TODO - should not hardcode timeout. Needs to wait until compilation or an error 
  // need to timeout for a few seconds to wait for compilation
  setTimeout(() => {
    res.sendFile(__dirname + `/${fn}.wasm`);
  }, 5000);
})

app.listen(port, () =>
  console.log("Server started successfully on port " + port)
);
