

import { setup_test_project } from "./test-setup.ts";
import { copy_files } from "../core.ts";


//
// Do test-project setup
//
Deno.test.beforeAll(async () => {
    await setup_test_project();

    // Perform copy
    await copy_files();
});


// These tests must ensure that copy_files handles config correctly.
// That is, that ignores files according to config data.
Deno.test("copy_files", async () => {



    // assert that the webpage was not copied
    // const page_timestamp = await get_file_timestamp(`${config.dir_build}/test-page.html`);
    // assert(page_timestamp > 0);


})
