import { exec } from "child_process";

// Takes a C/C++ file as a parameter, spawns a shell, and invokes emscripten to compile to js
export async function compileToJs(message) {
  const command = `emcc ${message}`;
  const { error, stdout, stderr } = await exec(command);
  if (error) {
    console.error(`Failed to compile: ${error.message}`);
    console.error(`Exited with code: ${error.code}`);
  }
  console.log("stdout: ", stdout);
  console.log("stderr: ", stderr);
}
