import { exec } from "child_process";
import { mkdirSync, writeFileSync, unlink } from "fs";
import { dirname, join } from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

// Takes a C/C++ file as a parameter, spawns a shell, and invokes emscripten to compile to js
/*
 * @param {string} file - The path to the C/C++ file to compile
 * @param {string} fileType - The desired output file type (js, html, or wasm)
 *    If not specified, defaults to js
 *
 * Takes a C/C++ file, spawns a shell, and invokes emscripten to compile. Creates new files depending
 * on the fileType parameter.
 *
 * @returns {Promise} - A promise that resolves to the name of the compiled file
 */
// TODO - Use fileType
export async function compileToWasm(fileName, fileType = "js") {
  // will need to accomodate built in emscripten
  let command = `docker run --platform linux/amd64\
    --rm \
    -v $(pwd):/src \
    -u $(id -u):$(id -g) \
    emscripten/emsdk \
    emcc ${fileName} -o ${fileName}.${fileType}`;
  const { error, stdout, stderr } = await exec(command);
  if (error) {
    console.log(`Failed to compile: ${error.message}`);
    console.log(`Exited with code: ${error.code}`);
  }
  console.log("stdout: ", stdout);
  console.log("stderr: ", stderr);
}

/*
 * @param {string} dirPath - The path to the directory to create
 */
export function createDir(dirPath) {
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const path = join(__dirname, "..", dirPath);
  return mkdirSync(path, { recursive: true });
}

/*
 * @param {string} filePath - The path to the file to create
 * @param {string} fileContents - The data to write to the file
 */
export function createFile(filePath, fileContents) {
  writeFileSync(filePath, fileContents, "utf8");
}

/*
    * @param {string} data - The data to write to the file
    Uses nanoid to generate a unique file name, creates a new file, and writes the data to that file.
    * @param {string} fileType - The type of file to create
 */
export function createRandomFileWithData(data, fileType="c") {
  const fileName = nanoid();
  createFile(`${fileName}.${fileType}`, data);
  return fileName;
}

/*
 * @param {string} filePath - The path to the file to delete
 */
export function deleteFile(filePath) {
  unlink(filePath);
}
