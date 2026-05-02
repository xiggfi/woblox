// object.ts
//
// various type definitions used in woblox
//



// Data generated after parsing a component file.
export interface ComponentData {
    tag_name: string    // e.g., "nav-bar"
    file_path: string  // including the full filename
    source_file_time: number  // timestamp
    build_time: number     // timestamp
}


export interface PageData {
    file_path: string           // file path with filename, relative from src dir.
    source_file_time: number    // timestamp
    build_time: number     // timestamp
}


// This is the format for woblox-config.json file
export interface Config {
    pages: string[]
    dir: {
        project: string
        src: string
        build: string
        comps: string
    }
}



