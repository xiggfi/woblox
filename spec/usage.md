# Usage


## Basic Usage

* Specify pages list
* Build everything

This example uses all default directories.

```typescript

import { * } from "./woblox.ts"

// Specify pages list
woblox.pages([
    "index.html",
])

// This copies all files that are not pages, or web components
// Should be done only once.
// When doing development, build script should omit this, on dev refresh.
woblox.copy_other_files()

// build everything
woblox.build()

```


## Advanced Usage
This example does a few more things.

```typescript

import { * } from "./woblox.ts"


// dir paths can be modified from the defaults
// contained in top level project dir. (except comps)
woblox.dirs({
    code: "code",
    dist: "dist",
    step: "step", // this is an intermediate step dir.
    comps: "comps", // dir inside of code dir
})


// This allows to have a list of pages, to build
woblox.pages([
    "index.html",
    "about.html"
])


// Wobloxprovides functions, for building specific files.

// This copies all files that are not in the web components dirs.
// Should be done only once. Or after pages modification.
// This MUST be done before building pages.
// When doing development, build scripts should omit this, on dev refreshes.
woblox.copy_other_files([)

// This build intermediate step, for all pages
woblox.build_step()

// This build intermediate step, for index page only
woblox.build_step("index.html")

// build both steps, for index page
woblox.build("index.html")

// This builds the final step. (From intermediate step).
woblox.build_dist("index.html")


```