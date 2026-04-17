// file.ts
//
// file loader module
// Handles loading user files
//


import { component_data } from "./data.ts"





// Copies all files that are not in web-component dir.
// Into both destination dirs.
function copy_other_files() {

}




// Scan a directory for component files
// Creates ComponentData instances. And add it to the component_data Map.
// Populates the component_data with names and paths.
export function scan_components(path: string) {
    for (const entry of Deno.readDirSync(path)) {
        const fullPath = path.endsWith("/") ? `${path}${entry.name}` : `${path}/${entry.name}`;

        if (entry.isDirectory) {
            scan_components(fullPath);
        } else if (entry.isFile && entry.name.endsWith(".html")) {
            const tagName = entry.name.slice(0, -5);
            component_data[tagName] = {
                tag_name: tagName,
                file_path: fullPath,
                template: "",
                css: "",
                js: "",
                last_build: new Date() // This will need changes. Should be last modified date.
            };
        }
    }
}



// Utility function to read files
export function load_file(path: string): string {
    return Deno.readTextFileSync(path);
}



// Utility function to write files
export function write_file(path: string, content: string) {
    Deno.writeTextFileSync(path, content);
}
