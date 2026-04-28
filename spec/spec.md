# Project Kyanite Specification

A minimalist web framework. 
For building component-based websites.

Using Deno and Native Web Components.


## Core Concept
Kyanite is a **Build-Time Framework**.
It transforms a directory of `.html` components and a "Page" template into a single, optimized distribution folder.
It avoids a heavy runtime library by leveraging native Browser **Custom Elements**.


## Tech Stack
*   **Runtime:** Deno
*   **Language:** TypeScript
*   **Target:** Modern Browsers (ES Modules, Custom Elements)


## Compilation Pipeline (The "Build")
Kyanite provides users two build steps, for a specific page:
* **step** - Intermediate step. Builds the page in `step/` directory.
    With compiled web-components, their templates and scripts.
* **dist** - Minifies the previous page, into `dist/` directory.

The user may want to run one specific step, or both.

The build process, will be used repeatedly, during dev. So it must be fast and efficient.

Kyanite uses files timestamps.
To build only things that have been modified.

The user must create a `pages.json` on the `code` dir.
A list of all pages that use Kyanite components.
This is for the `copy_files` API op, to not copy these pages.
And for the build process. When building all pages.


### Build Setup (1)
These steps are performed for both "step" and "dist" builds:
This is done by `build-1-setup.ts` file.
Involves reading file data, and storing it in state variables.

* **config file** Read `kyanite-config.json` file.
  This file contains the list of pages to build.
  (Full filepath with filename).
  And the directories configuration.

* **Read page timestamps**:
  Reads the timestamps of the page `.html` files.
  Only for the user specified pages, that are going to be built.
  
  There are 4 timestamps to read for each page.
  (Some files may not be there yet, so timestamp will be 0):
      * Page `code` file
      * Page `step` file
      * Page `dist` file
      * Page `dist` script file.
      
  If the "step" is newer than source, no need to re-build. -> "Step" Build process done.
  If the "dist" is newer than source, no need to re-build. -> "Dist" Build process done.
  
  Store the 4 timestamps on `page_data` state var.

* **Scan web-components directory:**
  Scans the "comps" directory, from "code" dir.
  * Gets components tag-names, filepath (from `code` dir), and timestamps.

* **Read web-component timestamps**:
  * For each web-component, get "step" script timestamp.
  * Store it on `component_data` state var.


### Step Build (2)
The following steps are performed for each specific page to build.
This is done by `build-2-step.ts` file.

* **Determine required components**:
  In the target web-page.

* **Check build dates**:
  Determine which web-components needs to be rebuilt.
  Compare the web-component timestamps:
      * The `code` dir, `.html` file timestamp.
      * The `step` dir, `.ts` script timestamp.
  If the script file is newer, than code html file, no need to rebuild the web-component script.
      -> Set `component_data` `built` property, to true.
      To indicate that build process, for this web-component` is done.

* **Generation (intermediate step):** 
  * Reads the source page html, into a string. To operate on it.
  * Repeats for each required web-component:
    * Parse the component.
      Extracts `<template>`, `<style>`, and `<script>` for each component.
    * Creates a `component-name.ts` file.
      The content, set to the content from the <script>, tag from the web-component `.html` definition file.
      (Copying the script content, is an initial, simple implementation.
      It may be improved in the future).
    * Writes web-component templates, at the top of page body.
    * Injects `<script src="component-name.ts" type="module">` for each web-component.
      In the body, right after the templates.
  * Writes the modified page string, to `step/` dir, as the web-page `.html` file.


### Dist build (minification) (3)
For the "Dist" build, the Kyanite Compiler performs the following steps:
This is done by `build-3-dist.ts` file.

* **Step Build**
  Perform the "Step" build. (if it has not been done in this run).
  To ensure the "Step" build, is up-to-date, to source files.
  
* **Minification**
  Generates a distributable minified page bundle, from the intermediate step.
  Using `deno bundle` command.
  Put on `dist/` dir.


## Directory Structure
Kyanite can be used without specifying any directories. By using the default ones.
Modyfying them is also possible.

```text
my-project/
|── kyanite-config.json    # config
├── code/
│   |── index.html    # A page template
|   └── comps/        # Component fragments
|       ├── nav-bar.html
|       └── user-card.html
├── build/            # The user build scripts
│   |── build.ts      # User build script, using Kyanite API
|   └── build-2.ts    # Another build script, using Kyanite API
├── step/             # Generated "Step" output (The "Compiled" page)
└── dist/             # Generated "Dist" output (The "Minified" page)
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






