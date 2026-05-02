# Config file spec

The confg file is looked by default, in the project root dir.
In the build script, the user can specify a path to the config file.

The config file contains the following data in json format.
With the specified default values.
Do not add trailing slashes to dir paths.

{
  "pages": [],                // Array of page paths. Woblox pages.
                              // (Path is from src_dir)
                              // Example: ["home.html", "subdir/page.html"]
  "src_dir": "src",           // Source dir. From Deno working dir.
  "build_dir": "build",       // Build dir. From Deno working dir.
  "comps_dir": "comps"        // Components dir. From src_dir.
}


