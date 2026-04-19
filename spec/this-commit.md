# This Commit
Detailed information of the current commit.
This file will be updated on each commit.


## File operations
We will be working on file operations.
(`code/file.ts`)
The framework relies heavily on reading/writing files and scanning directories.

## Async functions
We will use the "async" version of file functions.
For efficient file operations.


This commit
===========

## Copying other files
Implement "copy newer files".
In `code/core.ts`.

Using `file-util.ts`.

For when users need to copy files from the `code/` directory.
Into `step/` and `dist/` directories.

Must check if the files has been modified, to overwrite them.

Must omit the `comps` folder.
Because these are web-components, that will be compiled, and generated as `.ts` scripts.
In a later step.

The files will be copied to configured `step/` and `dist/` directories.
The configuration paths, are defined in `data.ts`.


`.html` Web-pages will all be copied. In a later step, the user will
overwrite the copied ones, with the framework-build ones.
Since they have the same file type, they will be overwritten.
For simplicity, we just copy all.






