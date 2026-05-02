// data.ts
//
// Data storage for woblox


import { ComponentData, Config, PageData } from "./object.ts"


// Storage for component data
export const component_data: Record<string, ComponentData> = {}


// state var - stores the page timestamps
export const page_data: Record<string, PageData> = {}



export let config: Config = {
    pages: [],
    dir_src: "src",
    dir_build: "build",
    dir_comps: "comps",
}


