// data.ts
//
// Data storage for kyanite


import { ComponentData } from "./object.ts"



// Storage for component data
export const component_data: Record<string, ComponentData> = {}


// Directories
export let dir = {
    code: "/code",
    dist: "/dist",
    step: "/step", // this is an intermediate step dir.

    // dir inside of code dir
    comps: "comps",
}


