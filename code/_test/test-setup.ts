// Module test-setup
//
// Does one-time test setup operations
//

import { config } from "../state.ts";
import { build_setup } from "../build/build-setup.ts";
import { load_config } from "../setup.ts";



// State var to hold the promise of the setup operation.
// This ensures that if multiple test files call setup concurrently,
// they all wait for the single setup operation to complete.
let setup_promise: Promise<void> | null = null;

export function setup_test_project(): Promise<void> {
    if (setup_promise) return setup_promise;

    setup_promise = (async () => {
        // load config first to get the correct dir names
        await load_config("test-files");

        // Delete all content of build dir
        try {
            await Deno.remove(config.dir_build, { recursive: true });
        } catch (error) {
            if (!(error instanceof Deno.errors.NotFound)) {
                throw error; // Re-throw other errors
            }
        }

        // recreate the build dir and comps dir inside it
        await Deno.mkdir(`${config.dir_build}/comps`, { recursive: true });

        await build_setup();
    })();

    return setup_promise;
}
