// page.ts
//
// Webpage operations module.
//

import { load_file } from "./file/file.ts";


//
// Determines the web-components used in a webpage.
// web-components have a <tag-name> format. (with hyphens)
// Returns an array of tag names.
//
export async function get_components(page_path: string): Promise<string[]> {

    const page_content = await load_file(page_path);

    const regex = /<([a-z][a-z0-9]*-[a-z0-9-]*)/g;
    const matches = page_content.matchAll(regex);
    const components = new Set<string>();

    for (const match of matches) {
        components.add(match[1]);
    }

    return Array.from(components);
}


//
// Inserts the web-components into a webpage.
//
function insert_components() {

}