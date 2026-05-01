// Build script
//
// For building the test project.
//
// Usage:
//
//  deno run -R=./test-files -W=./test-files test-files/build.ts


import { kyanite } from "../code/kyanite.ts";



await kyanite.load_config("test-files");
await kyanite.build();

