// file.ts
//
// file loader module
// Handles loading user files
//


import { component_list } from "./data.ts"








// Copies all files that are not in web-component dir.
// Into both destination dirs.
function copy_other_files() {

}




// Scan a directory for component files
// Creates ComponentData instances. And add it to the component_data Map.
// Populates the component_data with names and paths.
function scan_components(path: string) {

}



// Utility function to read files
export function load_file(path: string): string {
    return Deno.readTextFileSync(path);
}



// Utility function to write files
export function write_file(path: string, content: string) {
    Deno.writeTextFileSync(path, content);
}
