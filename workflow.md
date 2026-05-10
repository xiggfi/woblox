# Workflow

## Tests
Run tests with deno "test" command.
Tests need dir permissions:
```bash
deno test -R=./test-files/ -W=./test-files/
```

## Build the test project
First step, compiles Woblox components into typescript files.
This builds the `build` typescript web project:
```
deno run -R=test-files -W=test-files test-files/build.ts
```

Second step, translates the `.ts` into `.js` in a bundle:
This creates the `web` files, javascript:
```
deno bundle --outdir test-files/web test-files/build/test-page.html
```