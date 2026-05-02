// data.ts
//
// Data storage for woblox


import { ComponentData, Config, PageData } from "./object.ts"


// Storage for component data
export const component_data: Record<string, ComponentData> = {}


// state var - stores the page timestamps
export const page_data: Record<string, PageData> = {}


// Directories
export let dir = {
    project: ".",
    src: "src",
    build: "build",

    // dir inside of src dir
    comps: "comps",
}

export let config: Config = {
    pages: [],
    dir: dir,
}


