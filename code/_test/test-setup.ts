// Module test-setup
//
// Does one-time test setup operations
//

import { dir } from "../state.ts";
import { build_setup } from "../build/build-1-setup.ts";
import { load_config } from "../setup.ts";



// State var to determine if setup has been done.
let setup_done = false;



export async function setup_test_project() {

    if (setup_done) return;

    setup_done = true;

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

    // recreate the dirs
    await Deno.mkdir(`test-files/${dir.step}`);
    await Deno.mkdir(`test-files/${dir.dist}`);


    await load_config("test-files");

    await build_setup();
}
