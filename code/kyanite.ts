// kyanite.ts
//
// Main kyanite usage API
//
// This file is the user API.
// It is a clean, simple interface for the user.
// Work is implemented on `core.ts` module.


import * as core from "./core.ts"
import * as setup from "./setup.ts"
import { Config } from "./object.ts"


// Kyanite essential API
// Essential methods for usage.
// Advanced methods, are in the "advanced" namespace object.
//
export const kyanite = {


    // Sets config values manually.
    // Alternative way to work, without a config file.
    set_config: (config: Config) => {
        setup.set_config(config);
    },


    // Load a kyanite config file from the specified path.
    load_config: async (path: string) => {
        await setup.load_config(path);
    },


    // Without parameter, builds all pages.
    // If a list is provided, builds only these pages.
    build: async (pages?: string[]) => {
        await core.build(pages);
    },


    // Copies all files that are not pages or web components.
    // Into both destination dirs (step and dist).
    copy: async () => {
        await core.copy_files();
    },


    // Extra methods for more detailed operations.
    advanced: {
        // Methods may be added here in the future, if needed.
    }

}
