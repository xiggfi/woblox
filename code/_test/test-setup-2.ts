// Module test-setup
//
// Does one-time test setup operations
//
import { build_setup } from "../build/build-setup.ts";
import { load_config } from "../setup.ts";

// This file is NOT in use.
// This is an experimental, alternative implementation.
// It doesn't work ?? apparently.
// See test-setup.ts for the working implementation.


// State var to hold the promise of the setup operation.
// This ensures that if multiple test files call setup concurrently,
// they all wait for the single setup operation to complete.
export function setup_test_project(): Promise<void> {
    // We must always load the config and run build_setup for every test 
    // isolation to ensure the local 'dir', 'page_data', and 'component_data' 
    // objects are correctly initialized with current timestamps.
    // However, we only want to perform the filesystem cleanup once.

    return (async () => {
        if (!Deno.env.get("KYANITE_SETUP_FS_CLEANUP_DONE")) {
            // Delete all content of test-files/build-out
            try {
                await Deno.remove("test-files/build-out", { recursive: true });
            } catch (error) {
                if (!(error instanceof Deno.errors.NotFound)) {
                    throw error;
                }
            }

            // Recreate the dirs.
            await Deno.mkdir("test-files/build-out");

            Deno.env.set("KYANITE_SETUP_FS_CLEANUP_DONE", "true");
        }

        // Always load config to update local state.ts objects
        await load_config("test-files");

        // Always run build_setup to populate timestamps in local page_data/component_data
        await build_setup();
    })();
}