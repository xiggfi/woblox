// object.ts
//
// various type definitions used in kyanite
//



// Data generated after parsing a component file.
export interface ComponentData {
    tag_name: string    // e.g., "nav-bar"
    file_path: string  // including the full filename
    build: boolean     // true if the component has been modified and needs re-build
    source_file_time: number  // timestamp
    step_build_time: number     // timestamp
    dist_build_time: number     // timestamp
}


export interface PageData {
    file_path: string           // full file path with filename
    source_file_time: number    // timestamp
    step_build_time: number     // timestamp
    dist_build_time: number     // timestamp
}


// This is the format for kyanite-config.json file
export interface Config {
    pages: string[]
    code_dir: string
    step_dir: string
    dist_dir: string
}



