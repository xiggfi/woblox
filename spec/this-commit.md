# This Commit
Detailed information of the current commit.
This file will be re-written often.
Work described here, usually cover 1 commit.
In some cases, it may extend over multiple commits.


## Web-Component Html template improvements

Web-components creation spec has been improved.

The web-components template html, is now created in the script.
It's no longer inserted into the web-page html, as `<template>`.

This is to make the web-page more clean.
And to improve the web-component creation. More efficient.
It no longer has to pick elements, from the page body.

The name `<template-dom>` have been choosen, to reduce the
chance of bugs, with a name collision, inside the content.

- [ ] Update page-build process
- [ ] Verify tests
- [ ] Build the test-project, and verify it's ok



