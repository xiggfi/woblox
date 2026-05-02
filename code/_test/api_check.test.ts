import { woblox } from "../woblox.ts";
import { Config } from "../object.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("Woblox Usage API - set_config", () => {
    const testConfig: Config = {
        pages: ["test-page.html"],
        dir_src: "test-files/src",
        dir_build: "test-files/build",
        dir_comps: "test-files/comps"
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
