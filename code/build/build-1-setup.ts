// Build Setup Module
//
//
//

import { Config } from "../object.ts";
import { config, page_data, component_data } from "../data.ts";
import { load_file } from "../file/file.ts";
import { scan_components } from "../components.ts";
import { get_file_timestamp } from "../file/file-time.ts";
import { load_config } from "../setup.ts";

export async function build_setup() {

    // Setup timestamps
    await read_page_timestamps();
    await scan_comp_dir();
    await read_web_component_timestamps();
}



async function read_page_timestamps() {
    for (const pageName of config.pages) {
        page_data[pageName] = {
            file_path: pageName,
            source_file_time: await get_file_timestamp(`${config.dir.code}/${pageName}`),
            step_build_time: await get_file_timestamp(`${config.dir.step}/${pageName}`),
            dist_build_time: await get_file_timestamp(`${config.dir.dist}/${pageName}`),
            dist_script_time: await get_file_timestamp(`${config.dir.dist}/${pageName.replace(/\.html$/, '.js')}`)
        };
    }
}

async function scan_comp_dir() {
    await scan_components(config.dir.comps);
}

async function read_web_component_timestamps() {
    for (const tagName in component_data) {
        const comp = component_data[tagName];
        comp.source_file_time = await get_file_timestamp(comp.file_path);
        comp.step_build_time = await get_file_timestamp(`${config.dir.step}/${tagName}.ts`);
    }
}