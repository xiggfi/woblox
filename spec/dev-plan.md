# Next Steps Plan

The project currently has its module skeletons set up, but the core implementation logic needs to be written.

## Phase 1: Core File System Operations (`code/file.ts`)
The framework relies heavily on reading/writing files and scanning directories.
- [*] **Implement I/O Utilities:** Develop `load_file(path: string)` and `write_file(path: string, content: string)` using `Deno.readTextFileSync` and `Deno.writeTextFileSync` (or async equivalents).
- [ ] **Component Discovery:** Implement `scan_components(path: string)`. This should traverse the `comps` directory, discover `.html` component files, and begin building out the `ComponentData` entries to be put into `data.ts`.
- [ ] **Asset Copying:** Implement `copy_other_files()` to recursively copy any standard static assets (like images or global CSS) to both the `step/` and `dist/` destinations.


## Phase 2: Component Parsing and Compilation (`code/parse.ts`)
Web-component `.html` files must be parsed into usable classes and DOM templates.
- [ ] **Complete Component Parser:** Finish `parse_component(tag_name, raw_html)`. It already extracts `<template>`, `<style>`, and `<script>` via regex. Now, it needs to assemble these elements into a `ComponentData` object and store it inside the `component_data` registry (`code/data.ts`).
- [ ] **TS Code Generation:** Implement `compile_components()`. This function will iterate through `component_data` and generate the raw TypeScript code leveraging `customElements.define` logic (as outlined in `prototype.md`).


## Phase 3: The Intermediate Build Step (`code/build-step.ts` & `code/core.ts`)
Building the `step` phase prepares the components for the browser or an external bundler.
- [] **Page HTML Processing:** Load the user's `index.html` (or other target pages).
- [ ] **Template Injection:** Prepend all the parsed `<template>` contents for the dynamically discovered components into the `<body>` of the page.
- [ ] **Component Script Injection:** Append `<script src="[component-name].ts" type="module"></script>` near the end of the `<body>` for every component.
- [ ] **Emit Step Artifacts:** Save the generated `page.html` along with the individual dynamically written `[component-name].ts` code files to the `step/` output directory.


## Phase 4: Final Dist Compilation (`code/build-dist.ts` & `code/core.ts`)
The `dist` phase takes the intermediate output and preps it for production.
- [ ] **Minification & Bundling:** Implement `build_dist` to bundle the JS files and minify the output page. *Note: Deno's native `deno bundle` has been deprecated. We will need to investigate using an alternative bundler like `esbuild` or rely directly on browser ES modules with static imports, and update the spec accordingly.*
- [ ] **Output Setup:** Move everything into the final `dist/` directory cleanly, stripping out the intermediate development artifacts if necessary.


## Phase 5: Exposing the API (`code/kyanite.ts`)
Connect the internal implementations to the public API surface.
- [ ] **Bridge Functions:** Wire up the exposed properties in `kyanite.ts` (`build()`, `dirs()`, `build_step()`, `copy_other_files()`) to securely invoke the actual functions located in `core.ts`.
- [ ] **Configuration State:** Ensure directories requested in `kyanite.dirs(...)` properly update the underlying `dir` state in `data.ts`.


## Phase 6: Testing & Playground (`test/`)
- [ ] **Test Project Setup:** Construct a simple testing ground containing an `index.html` file and 2 primitive components (`test/code/comps/nav-bar.html`, etc.).
- [ ] **Builder Script Integration:** Write a `build.ts` that imports Kyanite and exercises the build flow to ensure `dist/` produces valid behavior in-browser.
