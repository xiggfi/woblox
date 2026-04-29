# Config file spec

The confg file is looked by default, in the project root dir.
In the build script, the user can specify a path to the config file.

The config file contains:

* Pages
  The list of pages that use Kyanite components.
 `pages`: Array of page full paths.
  
* Directories
  `project`: Container dir for code files.
  This is where the other, below dirs will be looked for.
  `code`: Path to code directory. From project dir.
  `step`: Step build directory. From project dir.
  `dist`: Dist build directory. From project dir.
  `comps`: Path to components directory. From code dir.


## Future Renaming
This structure may be renamed in the future.
Because all are code dirs.
Code should probably be the project dir.
The "project" dir name, should be left for the whole project dir.

Possible rename:
* Project -> Code
* Code -> Source
* Step -> Build
* Dist -> Dist