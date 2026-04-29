// core.ts
//
// Implementation of the framework operations.
// export functions here are called by the public API.
//
import { component_list } from "./state.ts"
import { load_file } from "./file.ts"
import { parse_component } from "./parse.ts"
import { dir, page, page_list } from "./state.ts"
import { copy_newer } from "./util/file-util.ts";



function load_components(dir: string) {
    for (const component of component_list) {
        let raw_html = load_file(component_list[component])
        parse_component(component, raw_html)
    }
}


// This must be done explicitly, by the user.
// Copies all files outside of components dir.
export async function copy_files() {

    const src = dir.code
    const dest = dir.step

    try {
        console.log("Syncing assets...");
        // 
        let ignore = {
            // #todo
        }
        await copy_newer(src, dest, ignore);
        console.log("Sync complete!");
    } catch (err) {
        console.error("Sync failed:", err.message);
    }
}




// Build both stpes.
// Without parameter, builds all pages.
export function build(pages?: string[]) {
    build_step(pages)
    build_dist(pages)
}


// This builds the intermediate step pages.
// Without parameter, builds all pages.
export function build_step(pages?: string[]) {
    rebuild_components()

    // ...
}



// This builds the final step pages. Minified.
// Uses current intermediate step build, as source.
// Without parameter, builds all pages.
export function build_dist(pages?: string[]) {
    rebuild_components()

    // ...
}



