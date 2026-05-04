# This Commit
Detailed information of the current commit.
This file will be re-written often.
Work described here, usually cover 1 commit.
In some cases, it may extend over multiple commits.


## Copy Files : Ignore Config

File: `code/file/file-time.ts`

Need to define a type: `IgnoreFiles`

The `copy_newer` function, needs to ignore some files when copying.
We use `ignore` parameter for this.
Files are taken from `config`, in another function.

We need to ignore:
* all Woblox pages.
* web-components directory.

[x] Type definition for ignore files
[x] Function to get list of files and dirs to ignore

## Tests for copy_newer
Test are ready. To evaluate the new implementation.
[x] Done

## Handle `ignore` parameter
We need a new implementation for `copy_newer`.
For it to efficiently handle `ignore`.
It must not be based on Deno `std/fs/walk`.
It must be a plain recursive function.
Using read and write file functions.

Test with:
`deno test -R=./test-files/ -W=./test-files/ ./code/file/file-time.test.ts`

[ ] `copy_newer` function implementation of `ignore` parameter