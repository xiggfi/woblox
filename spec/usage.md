# Usage


## Basic Usage

* Specify pages list
* Build everything

This example uses all default directories.

```typescript

import { * } from "./kyanite.ts"

// Specify pages list
kyanite.pages([
    "index.html",
])

// This copies all files that are not pages, or web components
// Should be done only once.
// When doing development, build script should omit this, on dev refresh.
kyanite.copy_other_files()

// build everything
kyanite.build()

```


## Advanced Usage
This example does a few more things.

```typescript

import { * } from "./kyanite.ts"


// dir paths can be modified from the defaults
// contained in top level project dir. (except comps)
kyanite.dirs({
    code: "code",
    dist: "dist",
    step: "step", // this is an intermediate step dir.
    comps: "comps", // dir inside of code dir
})


// This allows to have a list of pages, to build
kyanite.pages([
    "index.html",
    "about.html"
])


// Kyaniteprovides functions, for building specific files.

// This copies all files that are not in the web components dirs.
// Should be done only once. Or after pages modification.
// This MUST be done before building pages.
// When doing development, build scripts should omit this, on dev refreshes.
kyanite.copy_other_files([)

// This build intermediate step, for all pages
kyanite.build_step()

// This build intermediate step, for index page only
kyanite.build_step("index.html")

// build both steps, for index page
kyanite.build("index.html")

// This builds the final step. (From intermediate step).
kyanite.build_dist("index.html")


```