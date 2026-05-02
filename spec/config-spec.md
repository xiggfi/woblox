# Config file spec

The confg file is looked by default, in the project root dir.
In the build script, the user can specify a path to the config file.

The config file contains:

* Pages
  The list of pages that use Woblox components.
 `pages`: Array of page full paths.
  
* Directories
  `project`: Container dir for code dirs.
  This is where the other, below dirs will be looked for.
  `src`: Path to source directory. From project dir.
  `build`: Path to build directory. From project dir.
  `comps`: Path to components directory. From source dir.
Do not include slashes, in any of the above.
