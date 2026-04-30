import { assert, assertEquals, assertExists } from "jsr:@std/assert";
import { page_data, component_data } from "../../state.ts";
import { setup_test_project } from "../test-setup.ts";


//
// Do test-project setup
//
Deno.test.beforeAll(async () => {
    await setup_test_project();
});


Deno.test("Check page_data exists", async () => {
    assertExists(page_data["test-page.html"], "page_data should contain test-page.html");
    const page = page_data["test-page.html"];
    assertEquals(page.file_path, "test-page.html");
    assert(page.source_file_time > 0, "Source file time should be greater than 0");
})


// After build_setup(), the timestamps should have been read
Deno.test("Check page timestamps", async () => {
    const page = page_data["test-page.html"];
    assert(page.source_file_time > 0);
    assertEquals(page.build_time, 0);
})


Deno.test("Check component data", async () => {
    // 4. Assert: Check component_data
    assertExists(component_data["box-1"]);
    assertExists(component_data["box-2"]);
    assertExists(component_data["box-3"]);
    assertExists(component_data["box-4"]);
})


Deno.test("Check component data", async () => {

    const box1 = component_data["box-1"];
    assertEquals(box1.tag_name, "box-1");
    assertEquals(box1.file_path, "test-files/src/comps/box-1.html");
    assert(box1.source_file_time > 0, "Component source file time should be greater than 0");
})



