# This Commit
Detailed information of the current commit.
This file will be re-written often.
Work described here, usually cover 1 commit.
In some cases, it may extend over multiple commits.


## Implement build-2-step

As described in spec.md
File `build-2-step.ts`
Implementation should split the main steps, in multiple functions.
For better readability.

Includes these steps:

* Determine required components for the page.
* Check page timestamps. To determine if the page needs a build.
  If not, skip the page.
* Check component timestamps. To determine if the components
  need a build.
  If not, skip the component.
* Generate the component scripts files. In `step` dir.
* Generate the page file. In `step` dir.

[x] Done


## Implement tests for build-2-step
File `tests/build/test-build-2-step.ts`

The test should generate the test-project, "step" files.
In `test-files` dir.

Should generate the page, and components files.
And leave them there. For the user to inspect.

Should consist of multiple, easy to read Deno tests.
Separated according to task scopes.

Remember to run the test-setup, (as done in other test files),
required to prepare the test environment.

[x] Done


## Verify test-setup.ts
This should be run once. For various tests files.
Is this correctly implemented?

[x] Done