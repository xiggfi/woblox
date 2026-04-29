// Module test-setup
//
// Does one-time test setup operations
//

import { dir } from "../state.ts";
import { build_setup } from "../build/build-1-setup.ts";
import { load_config } from "../setup.ts";



// State var to hold the promise of the setup operation.
// This ensures that if multiple test files call setup concurrently,
// they all wait for the single setup operation to complete.
let setup_promise: Promise<void> | null = null;

export function setup_test_project(): Promise<void> {
    if (setup_promise) return setup_promise;

    setup_promise = (async () => {
        // Delete all content of test-files/step and test-files/dist
        try {
            await Deno.remove("test-files/step", { recursive: true });
            await Deno.remove("test-files/dist", { recursive: true });
        } catch (error) {
            if (!(error instanceof Deno.errors.NotFound)) {
                throw error; // Re-throw other errors
            }
        }

        // recreate the dirs
        await Deno.mkdir(`test-files/${dir.step}`);
        await Deno.mkdir(`test-files/${dir.dist}`);

        await load_config("test-files");

        await build_setup();
    })();

    return setup_promise;
}
