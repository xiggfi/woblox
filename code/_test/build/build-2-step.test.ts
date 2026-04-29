// test-build-2-step.ts
//
// Test for build-2-step.ts file.

import { assert, assertEquals, assertExists, assertStringIncludes } from "jsr:@std/assert";
import { setup_test_project } from "../test-setup.ts";
import { build_step } from "../../build/build-2-step.ts";
import { dir, page_data, component_data } from "../../state.ts";
import { load_file } from "../../file/file.ts";

// Run setup before tests
Deno.test.beforeAll(async () => {
    await setup_test_project();
    // Run the step build
    await build_step();
});

Deno.test("Step page file generated", async () => {
    const pagePath = `${dir.step}/test-page.html`;
    const fileInfo = await Deno.stat(pagePath);
    assert(fileInfo.isFile, "test-page.html should be generated in step dir");
});

Deno.test("Step component files generated", async () => {
    const components = ["box-1", "box-2", "box-3", "box-4"];
    
    for (const comp of components) {
        const compPath = `${dir.step}/${comp}.ts`;
        const fileInfo = await Deno.stat(compPath);
        assert(fileInfo.isFile, `Component script ${comp}.ts should be generated in step dir`);
    }
});

Deno.test("Page contains injected component scripts", async () => {
    const pagePath = `${dir.step}/test-page.html`;
    const pageHtml = await load_file(pagePath);
    
    assertStringIncludes(pageHtml, '<script src="box-1.ts" type="module"></script>');
    assertStringIncludes(pageHtml, '<script src="box-2.ts" type="module"></script>');
});

Deno.test("Page contains injected component templates", async () => {
    const pagePath = `${dir.step}/test-page.html`;
    const pageHtml = await load_file(pagePath);
    
    assertStringIncludes(pageHtml, '<template id="box-1"');
    assertStringIncludes(pageHtml, '<template id="box-2"');
});

Deno.test("Timestamps are updated in state", async () => {
    const page = page_data["test-page.html"];
    assert(page.step_build_time > 0, "Page step build time should be updated");
    
    const box1 = component_data["box-1"];
    assert(box1.step_build_time > 0, "Component step build time should be updated");
});