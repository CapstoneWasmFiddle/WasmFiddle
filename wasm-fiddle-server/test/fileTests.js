import {
  compileToWasm,
  createFile,
  createRandomFileWithData,
  createRandomRustProjectWithData,
  createDir,
  matchLanguage,
  compileRustToWasm,
} from "../libs/fileInteractionFunctions.js";
import { dirname, join } from "path";
import { rmdirSync, rmSync } from "fs";
import { fileURLToPath } from "url";
import chai from "chai";
import chaiFs from "chai-fs";

chai.use(chaiFs);

describe("compileToJs", () => {
  it("should compile a simple wasm file", async () => {
    await compileToWasm("./test/testFiles/hello_world.c", "wasm");
  });

  it("should create a new directory", async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const dirPath = "test/testDir";
    const path = join(__dirname, "..", dirPath);
    createDir(dirPath);
    chai.expect(path).to.be.a.directory();
    rmdirSync(path);
  });

  it("should create a new file in the files directory", async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const path = join(__dirname, "..", "files/testFile.txt");
    createFile("files/testFile.txt", "Hello World!");
    chai.expect(path).to.be.a.file().with.content("Hello World!");
    rmSync("files/testFile.txt");
  });

  it("Should create a random file with data", async () => {
    const data =
      '#include <stdio.h>\nint main() {\nprintf("Hello World!\\n");\nreturn 0;\n}';
    const languageList = ["c", "cpp", "rust"];
    for (const language of languageList) {
      const fileName = createRandomFileWithData(data, language);
      const suffix = matchLanguage(language);
      const fullName = fileName + "." + suffix;
      const __dirname = dirname(fileURLToPath(import.meta.url));
      const path = join(__dirname, "..", "files", fullName);
      chai.expect(path).to.be.a.file().with.content(data);
      rmSync(path);
    }
  });

  it("Should compile some C code to WASM and store it in the files directory", async () => {
    const data =
      '#include <stdio.h>\nint main() {\nprintf("Hello World!\\n");\nreturn 0;\n}';
    const fileName = createRandomFileWithData(data, "c");
    const fullName = fileName + ".c";
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const path = join(__dirname, "..", "files", fullName);
    const compilePath = join(__dirname, "..", "files", fileName);
    chai.expect(path).to.be.a.file().with.content(data);
    await compileToWasm(compilePath, "c");
    // There has to be a better way to do this. The test is synchronous,
    // but it takes a moment for `compileToWasm` to actually generate the file.
    // The test fails without some pause here.
    await new Promise((r) => setTimeout(r, 1000));
    const suffixArray = [".wasm", ".js"];
    for (const suffix of suffixArray) {
      const wasmName = fileName + suffix;
      const wasmPath = join(__dirname, "..", "files", wasmName);
      chai.expect(wasmPath).to.be.a.file();
      rmSync(wasmPath);
    }
    rmSync(path);
  });

  it("Should create a random rust library", async () => {
    const fileName = await createRandomRustProjectWithData("Hello World!");
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const path = join(__dirname, "..", "files", fileName, "src");
    await new Promise((r) => setTimeout(r, 1000));
    console.log(path);
    chai.expect(path).to.be.a.directory().with.files(["lib.rs"]);
    // rmSync(path, { recursive: true });
  });

  it("Should modify a rust project to contain the given file data", async () => {
    const fileName = await compileRustToWasm(
      'use wasm_bindgen::prelude::*;\n\nfn main() {\n\tprintln!("Hello World!");\n}'
    );
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const toml = join(__dirname, "..", "files", fileName, "Cargo.toml");
    console.log(toml);
    await new Promise((r) => setTimeout(r, 1000));
    chai.expect(toml).to.be.a.file();
  });

  it("Should compile a rust project to wasm", async () => {
    const fileName = await compileRustToWasm(
      'use wasm_bindgen::prelude::*;\n\nfn main() {\n\tprintln!("Hello World!");\n}'
    );
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const toml = join(__dirname, "..", "files", fileName, "Cargo.toml");
    console.log(toml);
    await new Promise((r) => setTimeout(r, 1000));
    chai.expect(toml).to.be.a.file();
  }).timeout(15000);
});
