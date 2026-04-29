// data.ts
//
// Data storage for kyanite


import { ComponentData, Config, PageData } from "./object.ts"


// Storage for component data
export const component_data: Record<string, ComponentData> = {}


// state var - stores the page timestamps
export const page_data: Record<string, PageData> = {}


// Directories
export let dir = {
    project: ".",
    code: "code",
    dist: "dist",
    step: "step", // this is an intermediate step dir.

    // dir inside of code dir
    comps: "comps",
}

export let config: Config = {
    pages: [],
    dir: dir,
}


