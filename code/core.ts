// core.ts
//
// Implementation of the framework operations.
// export functions here are called by the public API.
//
import { component_list } from "./data.ts"
import { load_file } from "./file.ts"
import { parse_component } from "./parse.ts"
import { dir, page, page_list } from "./data.ts"



function load_components(dir: string) {
    for (const component of component_list) {
        let raw_html = load_file(component_list[component])
        parse_component(component, raw_html)
    }
}


// This must be done explicitly, by the user.
// Copies all files outside of components dir, or that are pages.
export function copy_other_files() {
    copy_support_files_step()
    copy_support_files_dist()
}


// Rebuilds component data, for those that has been modified only.
function rebuild_components() {
    
}


// Build both stpes.
// Without parameter, builds all pages.
export function build(pages?: string[]) {
    rebuild_components()
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



