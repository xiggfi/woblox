![Woblox web-framework](https://xiggfi.github.io/woblox/img/woblox-bnnr.svg)

# Woblox
A minimalist web framework.\
For building component-based web-apps.\
Uses Deno and Native Web Components.

Lightweight, simple framework.\
Just a web-components compiler.


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
Pre-beta. Needs some fixes to go.


## Web-Components
Components are defined as `.html` files.

```html
<!-- comps/comp-card.html -->
<template mode="closed">Kyanite 
  <div>
    <slot></slot>
  </div>
</template>

<style>
  div {
    background-color: blue; color: white;
    margin: 10vw 40%; padding: 5vw; }
</style>

<script>
  // This will be modified
  this.addEventListener('click', () => console.log('Clicked!'));
</script>
```


## Usage
Users need to provide:
* Web-components in Woblox format.
* Web-pages that use the components.
* A build script (Typescript)

Run the build script, to get web-ready files.

```Typescript
import { woblox } from "code/woblox.ts";

await woblox.load_config("test-files");
await woblox.build();
```