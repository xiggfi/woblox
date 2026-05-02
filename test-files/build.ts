// Build script
//
// For building the test project.
//
// Usage:
//
//  deno run -R=./test-files -W=./test-files test-files/build.ts


import { woblox } from "../code/woblox.ts";



await woblox.load_config("test-files");
await woblox.build();

