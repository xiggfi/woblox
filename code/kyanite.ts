// kyanite.ts
//
// Main kyanite usage API
//
// 
// This file is the user API.
// It is a clean, simple interface for the user.
// Work is implemented on `core.ts` module.


import * as core from "./core.ts"
import { dir, page, page_list } from "./data.ts"



// Kyanite essential API
// Essential methods for usage.
// Advanced methods, are in the "advanced" namespace object.
//
export const kyanite = {


    // Sets dirs to use.
    dirs: (dirs: object) => {
        for (const dir of dirs) {
            // ..set dirs
        }
    },


    // Without parameter, builds all pages.
    // If a list is provided, builds only these pages.
    build: (pages?: string[]) => {

    },

    // Builds only the intermediate step.
    // Without parameter, builds all pages.
    // If a list is provided, builds only these pages.
    build_step: (pages?: string[]) => {

    },

    // Builds only the final step.
    // (Uses intermediate-step build, as source)
    // Without parameter, builds all pages.
    // If a list is provided, builds only these pages.
    build_dist: (pages?: string[]) => {

    },

    // Copies all files. Into both destination dirs.
    // This MUST be done before building pages.
    // And only once, or after page modifications.
    // All pages will be overwritten, with the original source data.
    // Those that are in thecomponents dir, are not copied.
    copy_other_files: () => {

    },


    // Here some extra methods for more detailed operations.
    advanced: {
        // Methods may be added here in the future, if needed.
    }

}

