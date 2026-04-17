# This Commit
Detailed information of the current commit.
This file will be updated on each commit.


## File operations
We will be working on file operations.
(`code/file.ts`)
The framework relies heavily on reading/writing files and scanning directories.


This commit
===========

**Component Discovery:**
Implement `scan_components(path: string)`. 
This should traverse the `comps` directory, discover `.html` component files, and begin building out the `ComponentData` entries to be put into `data.ts`.

Also implement any additional functionality or data, needed for scanning.

We will use the "sync" version of file functions.
To keep things simple. This is a build time tool.
No need for realtime operations.

The `comps` folder, is expected to contain strictly only web-component files. Of `.html` extension.

Each file, will be named as the web-component tag name.
It can contain directories. But directory hierarchy is not relevant.
All components must strictly have unique names.

In this step, we will only store the component name and path.