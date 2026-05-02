# Project Woblox Specification

A minimalist web framework. 
For building component-based websites.

Using Deno and Native Web Components.


## Core Concept
Woblox is a **Build-Time Framework**.
It transforms a directory of `.html` components and a "Page" template,
from an efficient format. Into an html compatible set of files.
It avoids a heavy runtime library, by leveraging native Browser **Custom Elements**.


## Tech Stack
*   **Runtime:** Deno
*   **Language:** TypeScript
*   **Target:** Modern Browsers (ES Modules, Custom Elements)


## Compilation Pipeline (The "Build")
Woblox provides users a build steps, for a specific page:
* **step** - Builds the page in `step/` directory.
    With compiled web-components, their templates and scripts.

The user may want to run one specific step, or both.

The build process, will be used repeatedly, during dev. So it must be fast and efficient.

Woblox uses files timestamps.
To build only things that have been modified.

The user must create a `woblox-config.json` on the `code` dir.
This file contains:
- The page list, that are using woblox components.
- Optional: The build directories.
See `config-spec.md` for more details.

When building, the user may pass a list of pages to build.
If none is passed, all pages from the config file are built.
(Only the ones that have been modified).
(web-component that has been modified, must be rebuilt).


### Build Setup (1)
These steps are performed for both "step" and "dist" builds:
This is done by `build-1-setup.ts` file.
Involves reading file data, and storing it in state variables.

* **config file** Read `woblox-config.json` file.
  This file contains the list of pages to build.
  (Full filepath with filename).
  And the directories configuration.

* **Read page timestamps**:
  Reads the timestamps of the page `.html` files.
  Only for the user specified pages, that are going to be built.
  
  There are 2 timestamps to read for each page.
  (Some files may not be there yet, so timestamp will be 0):
      * Page `src` file
      * Page `build` file
      
  If the "build" is newer than source, no need to re-build. -> "build" process done.
  
  Store the 2 timestamps on `page_data` state var.

* **Scan web-components directory:**
  Scans the "comps" directory, from "code" dir.
  * Gets components tag-names, filepath (from `code` dir), and timestamps.

* **Read web-component timestamps**:
  * For each web-component, get "step" script timestamp.
  * Store it on `component_data` state var.


### Build (2)
This is done by `build-2-step.ts` file.
This file builds the final step, for a single, specified page.
The following steps are performed:

* **Determine required components**:
  In the target web-page.

* **Check page build date**:
  Determine if the page needs to be rebuilt.
  Compare the page timestamps.

* **Check component build dates**:
  Determine which web-components needs to be rebuilt.
  Compare the web-component timestamps:
      * The `src` dir, `.html` file timestamp.
      * The `build` dir, `.ts` script timestamp.
  If the script file is newer, than code html file, no need to rebuild the web-component script.

* **Generation (intermediate step):** 
  * Reads the source page html, into a string. To operate on it.
  * Repeats for each required web-component:
    * Parse the component.
      Extracts `<template>`, `<style>`, and `<script>` for each component.
    * Creates a `component-name.ts` file. In target `build/comps/` dir.
      The content, set to the content from the `<script>`, tag from the web-component `.html` definition file.
      (Copying the script content, is an initial, simple implementation.
      It may be improved in the future).
    * Update the component "build" timestamp, to not re-build it.
      (When building multiple pages).
    * Writes web-component templates, at the top of page body.
    * Injects `<script src="component-name.ts" type="module">` for each web-component.
      In the body, right after the templates.
  * Writes the modified page string, to `build/` dir, as the web-page `.html` file.


## Directory Structure
Woblox can be used without specifying any directories. By using the default ones.
Modyfying them is also possible.

```text
my-project/
|── woblox-config.json    # config
├── src/                  # Source code directory
│   |── index.html    # A page template
|   └── comps/        # Component fragments
|       ├── nav-bar.html
|       └── user-card.html
├── build/            # The user build scripts
│   |── build.ts      # User build script, using Woblox API
|   └── build-2.ts    # Another build script, using Woblox API
└── build-out/        # Generated build output
```


## File formats

See `file-formats.md` for details.

This is the web-component file format:
```html
<!-- comps/comp-card.html -->
<template mode="closed">
  <div><slot></slot></div>
</template>

<script>
  // Create the component here
  // ...

</script>

<style>
  div { background-color: blue;  }
</style>
```

## Usage API
See `usage.md`


## Other operations
See `other-ops.md`






