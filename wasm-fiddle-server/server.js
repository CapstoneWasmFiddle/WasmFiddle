import express from "express";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { 
  compileToWasm, 
  createRandomFileWithData, 
  createDir
  } from "./libs/fileInteractionFunctions.js";

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
  const __dirname = dirname(fileURLToPath(import.meta.url));
  
  // create files dir
  if(!existsSync("./files")){
    createDir("./files");
  }

  // create and compile c file from retrieved source code 
  const fn = createRandomFileWithData(req.body.code, req.body.language);

  // compile to standalone wasm file
  await compileToWasm(`./files/${fn}`, req.body.language, "wasm");
  
  // TODO - should not hardcode timeout. Needs to wait until compilation or an error 
  // need to timeout for a few seconds to wait for compilation
  setTimeout(() => {
    res.sendFile(__dirname + `/files/${fn}.wasm`);
  }, 7000);

  // TODO - delete files after sending
})

app.listen(port, () =>
  console.log("Server started successfully on port " + port)
);
