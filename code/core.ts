// core.ts
//
// Implementation of the framework operations.
// export functions here are called by the public API.
//
import { component_data, config, page_data } from "./state.ts"
import { load_file } from "./file/file.ts"
import { parse_component } from "./parse.ts"
import { copy_newer, IgnoreFiles } from "./file/file-time.ts";
import { build_setup } from "./build/build-setup.ts";
import { build_page as build_page_impl } from "./build/build-page.ts";



async function load_components(path: string) {
    for (const component in component_data) {
        let raw_html = await load_file(component_data[component].file_path)
        parse_component(component, raw_html)
    }
}


// Get files to ignore, from config
// For copy_files function
function get_ignore_files(): IgnoreFiles {

    let ignore: IgnoreFiles = {}
    ignore[config.dir_src + '/' + config.dir_comps] = true

    for (const page in page_data) {
        ignore[page_data[page].file_path] = true
    }

    return ignore
}


// This must be done explicitly, by the user.
// Copies all files outside of components dir.
export async function copy_files() {

    const src = config.dir_src
    const dest = config.dir_build

    try {
        console.log("Syncing assets...");
        // 
        let ignore = get_ignore_files()
        await copy_newer(src, dest, ignore);
        console.log("Sync complete!");
    } catch (err: any) {
        console.error("Sync failed:", err.message);
    }
}




// Build the pages.
// Without parameter, builds all pages.
export async function build(pages?: string[]) {
    await build_setup();
    await build_page(pages);
}


// This builds the pages.
// Without parameter, builds all pages.
export async function build_page(pages?: string[]) {
    await build_page_impl();
}



