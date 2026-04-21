// file.ts
//
// file loader module
// Handles loading user files
//


import { component_data } from "../data.ts"




// Scan a directory for component files
// Creates ComponentData instances. And add it to the component_data Map.
// Populates the component_data with names and paths.
export async function scan_components(path: string) {
    for await (const entry of Deno.readDir(path)) {
        const fullPath = path.endsWith("/") ? `${path}${entry.name}` : `${path}/${entry.name}`;

        if (entry.isDirectory) {
            await scan_components(fullPath);
        } else if (entry.isFile && entry.name.endsWith(".html")) {
            const tagName = entry.name.slice(0, -5);
            component_data[tagName] = {
                tag_name: tagName,
                file_path: fullPath,
                built: false,
                template: "",
                css: "",
                js: "",
                last_modified: new Date() // This will need changes. Should be last modified date.
            };
        }
    }
}



// Utility function to read files
export async function load_file(path: string): Promise<string> {
    return await Deno.readTextFile(path);
}



// Utility function to write files
export async function write_file(path: string, content: string) {
    await Deno.writeTextFile(path, content);
}
