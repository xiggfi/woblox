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

    const src = dir.src
    const dest = dir.build

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




// Build the pages.
// Without parameter, builds all pages.
export function build(pages?: string[]) {
    build_page(pages)
}


// This builds the pages.
// Without parameter, builds all pages.
export function build_page(pages?: string[]) {
    rebuild_components()

    // ...
}



