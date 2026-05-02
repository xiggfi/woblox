
import { assert, assertEquals } from "jsr:@std/assert";
import { get_file_timestamp, copy_newer } from "../file/file-time.ts";
import { setup_test_project } from "./test-setup.ts";
import { config } from "../state.ts";


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
});


//
// Test copy_newer
// This test should be improved.
// To verify that it copies only newer files.
//
Deno.test("copy_newer", async () => {

    // Perform copy
    await copy_newer("test-files/src", `${config.dir_build}`, { files: [], dirs: [] });

    // assert that new copies were created
    const [src_timestamp, build_timestamp] = await Promise.all([
        get_file_timestamp("test-files/src/test-file.txt"),
        get_file_timestamp(`${config.dir_build}/test-file.txt`),
    ]);

    assert(build_timestamp > src_timestamp);

})