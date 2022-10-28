import { compileToJs } from "../libs/emscriptenFunctions.js";

describe("compileToJs", () => {
  it("should compile a simple wasm file", async () => {
    await compileToJs("./testFiles/hello_world.c");
  });
});
