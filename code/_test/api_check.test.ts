import { woblox } from "../woblox.ts";
import { Config } from "../object.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("Woblox Usage API - set_config", () => {
    const testConfig: Config = {
        pages: ["index.html"],
        dir: {
            project: ".",
            src: "src",
            build: "build",
            comps: "comps"
        }
    };

    woblox.set_config(testConfig);
    // If it doesn't throw, it's a success for now
});

Deno.test("Woblox Usage API - advanced namespace exists", () => {
    assertEquals(!!woblox.advanced, true);
});

Deno.test("Woblox Usage API - build exists", () => {
    assertEquals(typeof woblox.build, "function");
});

Deno.test("Woblox Usage API - copy exists", () => {
    assertEquals(typeof woblox.copy, "function");
});

Deno.test("Woblox Usage API - load_config exists", () => {
    assertEquals(typeof woblox.load_config, "function");
});
