
import { assert, assertEquals } from "jsr:@std/assert";
import { get_file_timestamp, copy_newer } from "../file/file-time.ts";



//
// before all, clear content of test/file-test/dist
//
Deno.test.beforeAll(async () => {

    try {
        await Deno.remove("test-files/file-test/dist", { recursive: true });
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            // Directory doesn't exist, which is fine
            return;
        }
        throw error; // Re-throw other errors
    }
    await Deno.mkdir("test-files/file-test/dist");
});


//
// Test get_file_timestamp
//
Deno.test("get_file_timestamp", async () => {
    let timestamp = await get_file_timestamp("test-files/file-test/code/test-file.txt");
    assert(timestamp > 0);

    let date_string = new Date(timestamp).toDateString();
    console.log(date_string);

    assertEquals(date_string, "Sun Apr 19 2026");
});


//
// Test copy_newer
// This test should be improved.
// To verify that it copies only newer files.
//
Deno.test("copy_newer", async () => {
    await copy_newer("test-files/file-test/code", "test-files/file-test/dist");

    // assert that dist/test-file.txt exists
    assert(await Deno.stat("test-files/file-test/dist/test-file.txt"));

    // assert that dist/test-file.txt content
    let code_content = await Deno.readTextFile("test-files/file-test/code/test-file.txt");
    let dist_content = await Deno.readTextFile("test-files/file-test/dist/test-file.txt");
    assertEquals(code_content, dist_content);

})