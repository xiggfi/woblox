// Module components.ts
//
// Some component functions
//




import { component_data, config } from "./state.ts"



// Scan a directory for component files
// Creates ComponentData instances. And add it to the component_data Map.
// Populates the component_data with names and paths.
export async function scan_components(path: string) {
    //console.log("scan_components", path);

    path = config.dir_src + "/" + path;

    for await (const entry of Deno.readDir(path)) {
        const fullPath = path.endsWith("/") ? `${path}${entry.name}` : `${path}/${entry.name}`;

        if (entry.isDirectory) {
            await scan_components(fullPath);
        } else if (entry.isFile && entry.name.endsWith(".html")) {
            const tagName = entry.name.slice(0, -5);
            component_data[tagName] = {
                tag_name: tagName,
                file_path: fullPath,
                source_file_time: 0,
                build_time: 0
            };
        }
    }
}