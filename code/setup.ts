// setup.ts
//
// Setup functions

import { load_file } from "./file/file.ts";
import { Config } from "./object.ts";
import { config, page_data } from "./state.ts";

//
// Reads config file
// Store data in dir object
// store pages in page_data
//
export async function load_config(path?: string) {

    const config_file_path = (path ? path : ".") + "/woblox-config.json";
    const text = await load_file(config_file_path);
    const config_json = JSON.parse(text);

    // get project dirs
    if (config_json.dir_src) config.dir_src = config_json.dir_src;
    if (config_json.dir_build) config.dir_build = config_json.dir_build;
    if (config_json.dir_comps) config.dir_comps = config_json.dir_comps;

    // get pages
    if (config_json.pages) {
        config.pages = config_json.pages;
        for (const page of config_json.pages) {
            page_data[page] = {
                file_path: page,
                source_file_time: -1,
                build_time: -1,
            };
        }
    }

}


//
// Manually sets the config object
//
export function set_config(new_config: Config) {
    config.pages = new_config.pages;
    config.dir_src = new_config.dir_src;
    config.dir_build = new_config.dir_build;
    config.dir_comps = new_config.dir_comps;

    // Initialize page_data for the provided pages
    for (const page of new_config.pages) {
        page_data[page] = {
            file_path: page,
            source_file_time: -1,
            build_time: -1,
        };
    }
}

