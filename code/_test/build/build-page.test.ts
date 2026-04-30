// test-build-2-step.ts
//
// Test for build-2-step.ts file.

import { assert, assertEquals, assertExists, assertStringIncludes } from "jsr:@std/assert";
import { setup_test_project } from "../test-setup.ts";
import { build_page } from "../../build/build-page.ts";
import { dir, page_data, component_data } from "../../state.ts";
import { load_file } from "../../file/file.ts";

// Run setup before tests
Deno.test.beforeAll(async () => {
    await setup_test_project();
    // Run the step build
    await build_page();
});

Deno.test("Step page file generated", async () => {
    const pagePath = `${dir.build}/test-page.html`;
    const fileInfo = await Deno.stat(pagePath);
    assert(fileInfo.isFile, "test-page.html should be generated in build dir");
});

Deno.test("Step component files generated", async () => {
    const components = ["box-1", "box-2", "box-3", "box-4"];
    
    for (const comp of components) {
        const compPath = `${dir.build}/comps/${comp}.ts`;
        const fileInfo = await Deno.stat(compPath);
        assert(fileInfo.isFile, `Component script ${comp}.ts should be generated in build dir`);
    }
});

Deno.test("Page contains injected component scripts", async () => {
    const pagePath = `${dir.build}/test-page.html`;
    const pageHtml = await load_file(pagePath);
    
    assertStringIncludes(pageHtml, '<script src="comps/box-1.ts" type="module"></script>');
    assertStringIncludes(pageHtml, '<script src="comps/box-2.ts" type="module"></script>');
});

Deno.test("Page contains injected component templates", async () => {
    const pagePath = `${dir.build}/test-page.html`;
    const pageHtml = await load_file(pagePath);
    
    assertStringIncludes(pageHtml, '<template id="box-1"');
    assertStringIncludes(pageHtml, '<template id="box-2"');
});

Deno.test("Timestamps are updated in state", async () => {
    const page = page_data["test-page.html"];
    assert(page.build_time > 0, "Page build time should be updated");
    
    const box1 = component_data["box-1"];
    assert(box1.build_time > 0, "Component build time should be updated");
});