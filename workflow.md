# Workflow

## Tests
Run tests with deno "test" command.
Tests need dir permissions:
```bash
deno test -R=./test-files/ -W=./test-files/
```

## Build the test project
```
deno run -R=test-files -W=test-files test-files/build.ts
```

```
deno bundle --outdir test-files/web test-files/build/test-page.html
```