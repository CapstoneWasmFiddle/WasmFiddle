import express from "express";
import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { 
  compileToWasm, 
  createRandomFileWithData, 
  createDir,
  checkExistsWithTimeout
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
  
  // wait 7 seconds for compilation
  let test = checkExistsWithTimeout(__dirname + `/files/${fn}.wasm`, 7000);
  test.then(() => {
    console.log("Successfully compiled");
    res.sendFile(__dirname + `/files/${fn}.wasm`);
  })
    .catch((err) => {
      console.error(`Could not find file - ${err.message}`);
      res.send("Unable to compile within 7000ms");
  })

  // TODO - delete files after sending
})

app.listen(port, () =>
  console.log("Server started successfully on port " + port)
);
