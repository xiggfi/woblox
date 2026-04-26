
import { assert, assertEquals } from "jsr:@std/assert";
import { get_file_timestamp, copy_newer } from "../file/file-time.ts";



//
// before all, clear content of test-files/step and test-files/dist
//
Deno.test.beforeAll(async () => {

    // Delete all content of test-files/step and test-files/dist
    try {
        await Deno.remove("test-files/step", { recursive: true });
        await Deno.remove("test-files/dist", { recursive: true });
    } catch (error) {
        if (error instanceof Deno.errors.NotFound) {
            // Directory doesn't exist, which is fine
            return;
        }
        throw error; // Re-throw other errors
    }

    await Deno.mkdir("test-files/step");
    await Deno.mkdir("test-files/dist");
});


//
// Test get_file_timestamp
//
Deno.test("get_file_timestamp", async () => {
    let timestamp = await get_file_timestamp("test-files/code/test-file.txt");
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
    await copy_newer("test-files/code", "test-files/step", { files: [], dirs: [] });

    // assert that step/test-file.txt exists
    assert(await Deno.stat("test-files/step/test-file.txt"));

    // assert that is newer than the original
    let step_timestamp = await get_file_timestamp("test-files/step/test-file.txt");
    let code_timestamp = await get_file_timestamp("test-files/code/test-file.txt");
    assert(step_timestamp > code_timestamp);

})