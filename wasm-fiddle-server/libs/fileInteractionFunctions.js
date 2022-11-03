import { exec } from "child_process";
import { mkdirSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { nanoid } from "nanoid";
import { fileURLToPath } from "url";

// Takes a C/C++ file as a parameter, spawns a shell, and invokes emscripten to compile to js
/*
 * @param {string} filePath - The path to the C/C++ file to compile, do not include file suffix
 * @param {string} language - The language of the file to compile, either "c" or "cpp"
 * @param {string} fileType - The desired output file type (js, html, or wasm)
 *    If not specified, defaults to js
 *
 * Takes a C/C++ file, spawns a shell, and invokes emscripten to compile. Creates new files depending
 * on the fileType parameter.
 *
 * @returns {Promise} - A promise that resolves to the name of the compiled file
 */
// TODO - Use fileType
export async function compileToWasm(filePath, language, fileType = "js") {
  const suffix = matchLanguage(language);
  const command = `emcc ${filePath}.${suffix} -o ${filePath}.${fileType}`;
  const { error, stdout, stderr } = await exec(command);
  if (error) {
    console.error(`Failed to compile: ${error.message}`);
    console.error(`Exited with code: ${error.code}`);
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
 */
export function createRandomFileWithData(data, language, filePath = "files") {
  let fileName = nanoid();
  const __dirname = dirname(fileURLToPath(import.meta.url));
  const suffix = matchLanguage(language);
  const fullName = fileName + "." + suffix;
  const path = join(__dirname, "..", filePath, fullName);
  createFile(path, data);
  return fileName;
}

export function matchLanguage(language) {
  if (language === "c") {
    return "c";
  } else if (language === "cpp") {
    return "cpp";
  } else if (language === "rust") {
    return "rs";
  }
}
