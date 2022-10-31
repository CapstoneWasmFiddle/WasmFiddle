import express from "express";
import { existsSync } from "fs";
import { 
  compileToWasm, 
  createRandomFileWithData, 
  createDir, 
  deleteFile } from "./libs/fileInteractionFunctions";
const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());

app.get("/status", (req, res) => {
  res.sendStatus(200);
});

app.post("/compile", (req, res) => {
  // TODO - need to account for compilation options
  // currently assumes c/cpp 
  src_code = req.body;

  // create compiledCode dir
  // if(!existsSync("./compiledCode")){
  //   createDir("../compiledCode");
  // }

  // create and compile c file from retrieved source code 
  fn = createRandomFileWithData(src_code);

  // send standalone wasm file
  compileToWasm(fn, "wasm");
  res.sendFile(`${fn}.wasm`);

  // delete wasm file
  deleteFile(`${fn}.wasm`);
})

app.listen(port, () =>
  console.log("Server started successfully on port " + port)
);
