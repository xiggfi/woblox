# Other Operations
Beside the compilation operation, there is some additional functionality.


## kyanite-config.json
JSON file containing:
* List of web-pages built using kyanite
This file is used to tell copy_web_files, what files should be ignored.

This file is placed by the user, in the `code` dir.

 
## Copy web files
A function to copy all website files, to destination folders.
(`step` and `build`).
This function only overwrites newer, modified files.
Ignores web-components dir, and kyanite-build web-pages.
