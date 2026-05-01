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

    const config_file_path = (path ? path : ".") + "/kyanite-config.json";
    const text = await load_file(config_file_path);
    const config_json = JSON.parse(text);

    // get project dir
    let project_dir = "."
    if (config_json.dir && config_json.dir.project) {
        project_dir = config_json.dir.project;
    }
    config.dir.project = project_dir;

    // get dirs
    if (config_json.dir) {
        config.dir.src = `${project_dir}/${config_json.dir.src}`;
        config.dir.build = `${project_dir}/${config_json.dir.build}`;
        config.dir.comps = `${config.dir.src}/${config_json.dir.comps}`;
    }

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
    config.dir = new_config.dir;

    // Initialize page_data for the provided pages
    for (const page of new_config.pages) {
        page_data[page] = {
            file_path: page,
            source_file_time: -1,
            build_time: -1,
        };
    }
}

