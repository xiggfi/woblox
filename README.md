![Woblox web-framework](https://xiggfi.github.io/woblox/img/woblox-bnnr.svg)

# Woblox
A minimalist web framework.\
For building component-based web-apps.\
Uses Deno and Native Web Components.

Lightweight, simple framework.\
Just a web-components compiler.

Note: Do not use.\
The project plan involves significant changes.\


## Targets
* Build time pre-compiled Web-apps.
* Single-page or multi-page.
* Static sites.
* Advanced use cases: server-side rendering.


## Tech
* Web-Components (native)
* Typescript
* Deno


## Description
Woblox is minimalist. All that it does, is to pre-compiles pages.\
With sets of web-components in Woblox special format. Into web-ready pages.

The web-component approach, greatly eases page development and maintenance.

It's minimalist design, keeps things simple.


## Fast
Pages are compiled at build time. No runtime overhead.\
So, it has fast performance.


## Status
Beta. Framework is usable. Can build projects.\
Project code is not the best quality.\
As it has been implemented in rush mode.\
This should improve later. 

Only support "/" filesystems.
To run in Windows, would need some method
that handles the "/" file paths...


## Web-Components
Components are defined as `.html` files.

```html
<!-- comps/comp-card.html -->
<template-dom mode="closed">
  <div>
    <slot></slot>
  </div>
</template-dom>

<style>
  div {
    background-color: blue; color: white;
    margin: 10vw 40%; padding: 5vw; }
</style>

<script>
import { comp_init } from "./woblox-comp.ts"  // This import is always included
import { something } from "somescript.ts"   // User imports ...

class Comp_Card extends HTMLElement {
    constructor() {
        super()
        comp_init(this, "box-1", template, style);
        // ... User code
    }
    // User class code
    // ...
}
</script>
```


## Usage
Users need to provide:
* Web-components in Woblox format.
* Web-pages that use the components.
* A build script (Typescript)

Run the build script, to get web-ready files.

A basic example:
```ts
import { woblox } from "code/woblox.ts";

await woblox.load_config("test-files");
await woblox.build();
```

### API
Usage API is in `woblox.ts`
Check it, to understand how the framework works.

`woblox-config.json` can be loaded from dir.
Or can be included in-line.

There is a function to copy all project files, to output dir.

The generated output is in Typescript.
It will be needed to convert it to javascript.
This can be done with `deno bundle ...` command.
Or some other method, of user preference.


## Copyright
Copyright (c) 2026 Xzzulz
The Woblox license.
