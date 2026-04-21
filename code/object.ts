// object.ts
//
// various type definitions used in kyanite
//



// Data generated after parsing a component file.
export interface ComponentData {
    tag_name: string    // e.g., "nav-bar"
    file_path: string  // including the full filename
    built: boolean     // This is to determine if the component has already been built.
    template: string   // The HTML inside <template>
    css: string        // The CSS inside <style>
    js: string         // The JS inside <script>
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



