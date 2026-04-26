// Build Setup Module
//
//
//

import { Config } from "../object.ts";
import { dir, page_data, component_data } from "../data.ts";
import { load_file, scan_components } from "../file/file.ts";
import { get_file_timestamp } from "../file/file-time.ts";

export async function build_setup() {
    // Read config file
    let config: Config;
    try {
        const configText = await load_file(`${dir.code}/kyanite-config.json`);
        config = JSON.parse(configText);
    } catch (e) {
        console.error("Failed to load or parse kyanite-config.json:", e);
        return;
    }

    // Update directories if specified in config
    if (config.code_dir) dir.code = config.code_dir;
    if (config.step_dir) dir.step = config.step_dir;
    if (config.dist_dir) dir.dist = config.dist_dir;

    // Read page timestamps
    for (const pageName of config.pages) {
        page_data[pageName] = {
            file_path: `${dir.code}/${pageName}`,
            source_file_time: await get_file_timestamp(`${dir.code}/${pageName}`),
            step_build_time: await get_file_timestamp(`${dir.step}/${pageName}`),
            dist_build_time: await get_file_timestamp(`${dir.dist}/${pageName}`),
            dist_script_time: await get_file_timestamp(`${dir.dist}/${pageName.replace(/\.html$/, '.js')}`)
        };
    }

    // Scan comp dir
    await scan_components(`${dir.code}/${dir.comps}`);

    // Read web-component timestamps
    for (const tagName in component_data) {
        const comp = component_data[tagName];
        comp.source_file_time = await get_file_timestamp(comp.file_path);
        comp.step_build_time = await get_file_timestamp(`${dir.step}/${tagName}.ts`);
    }
}