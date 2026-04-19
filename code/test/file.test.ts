

import { get_file_timestamp } from "../util/file-util.ts";
import { assert, assertEquals } from "jsr:@std/assert";





Deno.test("get_file_timestamp", async () => {
    let timestamp = await get_file_timestamp("test/file-test/code/test-file.txt");
    assert(timestamp > 0);

    let date_string = new Date(timestamp).toDateString();
    console.log(date_string);

    assertEquals(date_string, "Sun Apr 19 2026");
});