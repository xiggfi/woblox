import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { get_components } from "../page.ts";

Deno.test("get_components detects unique hyphenated tags", async () => {
  const test_file = "test-files/file-test/code/test-page.html";

  try {
    const components = await get_components(test_file);
    components.sort();
    assertEquals(components, ["inner-comp", "my-component", "nested-comp", "other-comp"]);
  } catch (error) {
    throw new Error("Error getting components: " + error);
  }
});
