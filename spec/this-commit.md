# This Commit
Detailed information of the current commit.
This file will be re-written often.
Work described here, usually cover 1 commit.
In some cases, it may extend over multiple commits.


## Implement kyanite usage API

File: `code/kyanite.ts`

Implement the methods defined for the usage API.
Which is the interface the end user will interact with.

These methods should consist of simple calls,
to lower level functions.
In `core.ts` module, mostly. Or from other modules, if needed,
for a super clear implementation.

No complex logic should be implemented here.
Only clean, simple methods.
We want this file, to be super-easy to read, and understand.

[x] `build()`
[x] `copy()`
[x] `set_config()`
[x] `load_config()`

See `sped.md` for details.


Gemini detailed description of changes
======================================

# Walkthrough - Kyanite Usage API Implementation

I have implemented the high-level usage API for the Kyanite framework, providing a clean interface for users to build, copy, and configure their projects.

## Changes Made

### Usage API
- **[kyanite.ts](file:///home/linx/src/web/kyanite/code/kyanite.ts)**: Implemented the `kyanite` object with the following methods:
    - `set_config(config: Config)`: Manually sets the configuration.
    - `load_config(path: string)`: Loads configuration from a JSON file.
    - `build(pages?: string[])`: Triggers the build process for pages.
    - `copy()`: Syncs assets and non-component files.
    - `advanced`: Namespace for future advanced operations.

### Underlying Logic
- **[setup.ts](file:///home/linx/src/web/kyanite/code/setup.ts)**: Added `set_config` and fixed a missing closing brace in `load_config`.
- **[core.ts](file:///home/linx/src/web/kyanite/code/core.ts)**: 
    - Fixed inconsistent imports and variable names.
    - Made `build` and `build_page` asynchronous.
    - Fixed a bug where `load_file` (async) was called synchronously.
    - Corrected the `copy_newer` import path.
- **[parse.ts](file:///home/linx/src/web/kyanite/code/parse.ts)**: Exported `parse_component` so it can be used by the core logic.

### Verification
- **[api_check.test.ts](file:///home/linx/src/web/kyanite/code/_test/api_check.test.ts)**: Created a new Deno test suite to verify the API surface.
- Ran all tests using `deno test -R=./test-files/ -W=./test-files/`, and all 17 tests passed successfully.

## Verification Results

```text
running 17 tests from 5 files
...
ok | 17 passed | 0 failed (964ms)
```