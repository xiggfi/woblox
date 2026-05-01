// file.ts
//
// file loader module
// Handles loading user files
//






import { dirname } from "jsr:@std/path";

// Utility function to read files
export async function load_file(path: string): Promise<string> {
    return await Deno.readTextFile(path);
}

// Utility function to write files
export async function write_file(path: string, content: string) {
    await Deno.mkdir(dirname(path), { recursive: true });
    await Deno.writeTextFile(path, content);
}
