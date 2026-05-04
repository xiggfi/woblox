
import { assert, assertEquals } from "jsr:@std/assert";
import { exists } from "jsr:@std/fs";
import { get_file_timestamp, copy_newer, IgnoreFiles } from "../../file/file-time.ts";
import { setup_test_project } from "../test-setup.ts";
import { config } from "../../state.ts";
import { copy_files } from "../../core.ts";


//
// Do test-project setup
//
Deno.test.beforeAll(async () => {
    await setup_test_project();

    // Make sure `test-files/copy-files` dir is empty before running the test.
    // delete and recreate it
    await Deno.remove("test-files/copy-files", { recursive: true }).catch(() => { });
    await Deno.mkdir("test-files/copy-files");
});


//
// Test get_file_timestamp
//
Deno.test("get_file_timestamp", async () => {
    let timestamp = await get_file_timestamp("test-files/src/test-file-1.txt");
    assert(timestamp > 0);
});



// Test copy_newer
// await because further tests depend on completion
await Deno.test("copy_newer", async () => {

    // Perform copy
    const ignore: IgnoreFiles = {};
    ignore[`${config.dir_src}/ignore.txt`] = true;
    ignore[`${config.dir_src}/comps`] = true;
    await copy_newer(config.dir_src, "test-files/copy-files", ignore);

    //assert
    assert(await exists("test-files/copy-files/test-file-1.txt"));
    assert(await exists("test-files/copy-files/test-file-2.txt"));
})


await Deno.test("copy_newer ignore files", async () => {

    // assert that `ignore.txt` was not copied.
    assert(!(await exists("test-files/copy-files/ignore.txt")));
})



await Deno.test("copy_newer ignore dir", async () => {
    // assert that `comps` dir was not copied.
    assert(!(await exists("test-files/copy-files/comps")));
})


await Deno.test("copy_newer overwrite", async () => {
    // Modifiy `test-file-2.txt` and veriy again
    await Deno.writeTextFile("test-files/copy-files/test-file-2.txt", "modified");
    const ignore: IgnoreFiles = {};
    ignore[`${config.dir_src}/ignore.txt`] = true;
    ignore[`${config.dir_src}/comps`] = true;
    await copy_newer(config.dir_src, "test-files/copy-files", ignore);

    // assert that only the modified file was copied
    const [file_1, file_2] = await Promise.all([
        Deno.readTextFile("test-files/copy-files/test-file-1.txt"),
        Deno.readTextFile("test-files/copy-files/test-file-2.txt")
    ])
    assert(file_1 === "test-file-1");
    assert(file_2 === "modified");
})


Deno.test.afterAll(async () => {
    // Empty the dir to finish
    await Deno.remove("test-files/copy-files", { recursive: true }).catch(() => { });
    await Deno.mkdir("test-files/copy-files");

})
