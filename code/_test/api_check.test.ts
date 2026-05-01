import { kyanite } from "../kyanite.ts";
import { Config } from "../object.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("Kyanite Usage API - set_config", () => {
    const testConfig: Config = {
        pages: ["index.html"],
        dir: {
            project: ".",
            src: "src",
            build: "build",
            comps: "comps"
        }
    };

    kyanite.set_config(testConfig);
    // If it doesn't throw, it's a success for now
});

Deno.test("Kyanite Usage API - advanced namespace exists", () => {
    assertEquals(!!kyanite.advanced, true);
});

Deno.test("Kyanite Usage API - build exists", () => {
    assertEquals(typeof kyanite.build, "function");
});

Deno.test("Kyanite Usage API - copy exists", () => {
    assertEquals(typeof kyanite.copy, "function");
});

Deno.test("Kyanite Usage API - load_config exists", () => {
    assertEquals(typeof kyanite.load_config, "function");
});
