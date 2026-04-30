
import { assert, assertEquals } from "jsr:@std/assert";
import { get_file_timestamp, copy_newer } from "../file/file-time.ts";
import { setup_test_project } from "./test-setup.ts";



//
// Do test-project setup
//
Deno.test.beforeAll(async () => {
    await setup_test_project();
});


//
// Test get_file_timestamp
//
Deno.test("get_file_timestamp", async () => {
    let timestamp = await get_file_timestamp("test-files/src/test-file.txt");
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

    // Perform copy
    await copy_newer("test-files/src", "test-files/build-out", { files: [], dirs: [] });

    // assert that new copies were created
    const [src_timestamp, build_timestamp] = await Promise.all([
        get_file_timestamp("test-files/src/test-file.txt"),
        get_file_timestamp("test-files/build-out/test-file.txt"),
    ]);

    assert(build_timestamp > src_timestamp);

})