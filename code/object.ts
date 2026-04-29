// object.ts
//
// various type definitions used in kyanite
//



// Data generated after parsing a component file.
export interface ComponentData {
    tag_name: string    // e.g., "nav-bar"
    file_path: string  // including the full filename
    source_file_time: number  // timestamp
    step_build_time: number     // timestamp
    dist_build_time: number     // timestamp
}


export interface PageData {
    file_path: string           // file path with filename, relative from code dir.
    source_file_time: number    // timestamp
    step_build_time: number     // timestamp
    dist_build_time: number     // timestamp
    dist_script_time: number    // timestamp
}


// This is the format for kyanite-config.json file
export interface Config {
    pages: string[]
    dir: {
        project: string
        code: string
        step: string
        dist: string
        comps: string
    }
}



