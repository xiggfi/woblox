import { assert, assertEquals } from "jsr:@std/assert";
import { get_components } from "../page.ts";
import { setup_test_project } from "./test-setup.ts";


//
// Do test-project setup
//
Deno.test.beforeAll(async () => {
  await setup_test_project();
});

Deno.test("get_components detects unique hyphenated tags", async () => {
  const test_file = "test-files/code/test-page.html";

  try {
    const components = await get_components(test_file);
    components.sort();
    assertEquals(components, ["box-1", "box-2", "box-3", "box-4"]);
  } catch (error) {
    throw new Error("Error getting components: " + error);
  }
});
