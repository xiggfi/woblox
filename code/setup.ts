// setup.ts
//
// Setup functions

import { load_file } from "./file/file.ts";
import { config, page_data } from "./data.ts";

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
        config.dir.code = `${project_dir}/${config_json.dir.code}`;
        config.dir.step = `${project_dir}/${config_json.dir.step}`;
        config.dir.dist = `${project_dir}/${config_json.dir.dist}`;
        config.dir.comps = `${config.dir.code}/${config_json.dir.comps}`;
    }

    // get pages
    if (config_json.pages) {
        config.pages = config_json.pages;
        for (const page of config_json.pages) {
            page_data[page] = {
                file_path: page,
                source_file_time: -1,
                step_build_time: -1,
                dist_build_time: -1,
                dist_script_time: -1,
            };
        }
    }

}

