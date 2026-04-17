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
The Kyanite Compiler performs the following steps:

* **Discovery:** Scans the "comps" directory.
* **Parsing:** Extracts `<template>`, `<style>`, and `<script>` from each component.
* **Generation (intermediate step):** 
    * Creates a `component.ts` file for each component.
      Containing the `customElements.define` logic for every component found.
    * Wraps the `<script>` content into the `connectedCallback` of the Web Component.
    * Puts web-component templates, at the top of page body.
    * Injects `<script src="component-name.ts" type="module">` for each web-component.
      In the body, right after the templates.
    * This step is put on `step/` dir.
* **Compilation (final step):**:
    * Generates a distributable minified page bundle, from the intermediate step.
      Using `deno bundle` command.
      Put on `dist/` dir.


## Directory Structure
Kyanite can be used without specifying any directories. By using the default ones.
Modyfying them is also possible.

```text
my-project/
├── code/
│   |── index.html    # A page template
|   └── comps/        # Component fragments
|       ├── nav-bar.html
|       └── user-card.html
├── build.ts          # The user build script, using Kyanite API
└── dist/             # Generated output (The "Compiled" page)
```


## File formats

See `file-formats.md` for details.

This is the web-component file format:
```html
<!-- comps/comp-card.html -->
<template mode="closed">
  <div><slot></slot></div>
</template>
<style>
  div { background-color: blue;  }
</style>
<script>
  this.addEventListener('click', () => console.log('Clicked!'));
</script>
```


## Usage API

See `usage.md`





