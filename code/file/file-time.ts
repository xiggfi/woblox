// file-time.ts
//
// Operations related to file timestamps.
//

import { walk } from "jsr:@std/fs/walk";
import { dirname, join, relative } from "jsr:@std/path";



/* Usage
import { copyNewer } from "./fs_utils.ts";

const src = "./src/assets";
const dest = "./dist/assets";

try {
  console.log("Syncing assets...");
  await copyNewer(src, dest);
  console.log("Sync complete!");
} catch (err) {
  console.error("Sync failed:", err.message);
}
*/


//
// Get file timestamp
// Returns 0 if the file doesn't exist.
//
export async function get_file_timestamp(path: string): Promise<number> {
  try {
    const stat = await Deno.stat(path).catch(() => null);
    if (!stat) return 0;
    return stat.mtime?.getTime() ?? 0;
  } catch (error) {
    console.error(`Error getting file timestamp for ${path}:`, error);
    return 0;
  }
}


//
// Checks if the source file is newer than the destination file.
// Returns true if the destination doesn't exist or source is newer.
//
async function is_newer(src: string, dest: string): Promise<boolean> {
  try {
    // const [srcStat, destStat] = await Promise.all([
    //   Deno.stat(src),
    //   Deno.stat(dest).catch(() => null), // Return null if dest doesn't exist
    // ]);

    // if (!destStat) return true;

    // const srcMtime = srcStat.mtime?.getTime() ?? 0;
    // const destMtime = destStat.mtime?.getTime() ?? 0;
    const [src_mtime, dest_mtime] = await Promise.all([
      get_file_timestamp(src),
      get_file_timestamp(dest),
    ]);

    return src_mtime > dest_mtime;
  } catch (error) {
    console.error(`Error comparing files ${src} and ${dest}:`, error);
    return false;
  }
}


//
// Ensures the destination directory exists before copying.
//
async function ensure_dir(path: string) {
  try {
    await Deno.mkdir(dirname(path), { recursive: true });
  } catch (err) {
    if (!(err instanceof Deno.errors.AlreadyExists)) throw err;
  }
}


// Describes files and dirs that should be ignored by copy_newer
interface IgnoreFiles {
  files: string[]       // list of file paths to ignore
  dirs: string[]        // list of directory paths, to ignore
}


//
// Recursively copies files from source to destination.
// Only overwrites if the source file is more recent.
// ignore: IgnoreFiles : files and dirs to ignore (not implemented yet)
//
export async function copy_newer(srcDir: string, destDir: string, ignore: IgnoreFiles) {
  // Verify source exists
  const srcStat = await Deno.stat(srcDir);
  if (!srcStat.isDirectory) {
    throw new Error(`Source path "${srcDir}" is not a directory.`);
  }

  // Iterate through all files in the source directory
  for await (const entry of walk(srcDir, { includeDirs: false })) {
    const relPath = relative(srcDir, entry.path);
    const targetPath = join(destDir, relPath);

    if (await is_newer(entry.path, targetPath)) {
      await ensure_dir(targetPath);
      await Deno.copyFile(entry.path, targetPath);
      console.log(`Updated: ${relPath}`);
    }
  }
}