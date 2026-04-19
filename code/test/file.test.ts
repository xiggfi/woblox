
import { assert, assertEquals } from "jsr:@std/assert";
import { get_file_timestamp, copy_newer } from "../util/file-util.ts";




// before all, clear content of test/file-test/dist
Deno.test.beforeAll(async () => {
    await Deno.remove("test/file-test/dist", { recursive: true });
});


// Test get_file_timestamp
Deno.test("get_file_timestamp", async () => {
    let timestamp = await get_file_timestamp("test/file-test/code/test-file.txt");
    assert(timestamp > 0);

    let date_string = new Date(timestamp).toDateString();
    console.log(date_string);

    assertEquals(date_string, "Sun Apr 19 2026");
});


// Test copy_newer
Deno.test("copy_newer", async () => {
    await copy_newer("test/file-test/code", "test/file-test/dist");

    // assert that dist/test-file.txt exists
    assert(await Deno.stat("test/file-test/dist/test-file.txt"));

    // assert that dist/test-file.txt content
    let code_content = await Deno.readTextFile("test/file-test/code/test-file.txt");
    let dist_content = await Deno.readTextFile("test/file-test/dist/test-file.txt");
    assertEquals(code_content, dist_content);

})