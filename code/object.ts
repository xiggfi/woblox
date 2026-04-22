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


interface PageData {
    file_path: string
    source_file_time: number
    step_build_time: number
    dist_build_time: number
}


// This is the format for kyanite-config.json file
interface config {
    pages: string[]
    code_dir: string
    step_dir: string
    dist_dir: string
}



