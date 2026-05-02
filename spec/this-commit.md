# This Commit
Detailed information of the current commit.
This file will be re-written often.
Work described here, usually cover 1 commit.
In some cases, it may extend over multiple commits.


## Build script for test project

File: `test-files/build.ts`

Implement a build script for the test project.

The script should be able to build the test project.
In `test-files/build` directory.

The script runs with:
```shell
deno run -R=./test-files -W=./test-files test-files/build.ts
```

[x] Done


## Problem

The build script is not generating any output.

[x] Done


Changes
=======

# Walkthrough - Fixing Build Generation

The build script was failing to generate output files because the core build logic was not being called and the script was not loading the project configuration. I have fixed these issues and ensured that the build process can create the necessary output directories.

## Changes Made

### Core Logic
- **[core.ts](file:///home/linx/src/web/woblox/code/core.ts)**: Updated the `build` function to call `build_setup()` and `build_page_impl()` from the internal build modules. This ensures that the build pipeline actually executes.
- **[file.ts](file:///home/linx/src/web/woblox/code/file/file.ts)**: Updated `write_file` to use `Deno.mkdir(..., { recursive: true })` before writing. This prevents "No such file or directory" errors when writing to new subdirectories like `build-out/comps/`.

### Test Project
- **[build.ts](file:///home/linx/src/web/woblox/test-files/build.ts)**: Added a call to `woblox.load_config("test-files")`. This allows the Woblox framework to find the `woblox-config.json` file and correctly map the source and build directories.

## Verification Results

Running the build script now correctly generates the output:

```bash
deno run -R=./test-files -W=./test-files test-files/build.ts
```

Output files generated in `test-files/build-out/`:
- `test-page.html` (with injected components)
- `comps/box-1.ts`
- `comps/box-2.ts`
- `comps/box-3.ts`
- `comps/box-4.ts`
