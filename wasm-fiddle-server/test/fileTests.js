import {
  compileToWasm,
  createFile,
  createRandomFileWithData,
  createDir,
} from "../libs/fileInteractionFunctions.js";
import { dirname, join } from "path";
import { rmdirSync, rmSync } from "fs";
import { fileURLToPath } from "url";
import chai from "chai";
import chaiFs from "chai-fs";

chai.use(chaiFs);

describe("compileToJs", () => {
  it("should compile a simple wasm file", async () => {
    await compileToWasm("./testFiles/hello_world.c");
  });

  it("should create a new directory", async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const dirPath = "test/testDir";
    const path = join(__dirname, "..", dirPath);
    createDir(dirPath);
    chai.expect(path).to.be.a.directory();
    rmdirSync(path);
  });

  it("should create a new file", async () => {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const path = join(__dirname, "..", "test/testFile.txt");
    createFile("test/testFile.txt", "Hello World!");
    chai.expect(path).to.be.a.file().with.content("Hello World!");
    rmSync("test/testFile.txt");
  });

  it("Should create a random file with data", async () => {
    const data = "Hello World!";
    const fileName = createRandomFileWithData(data);
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const path = join(__dirname, "..", fileName);
    chai.expect(path).to.be.a.file().with.content(data);
    rmSync(fileName);
  });
});
