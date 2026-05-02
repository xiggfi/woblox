# Woblox
A minimalist web framework.
For building component-based web-apps.
Uses Deno and Native Web Components.

Lightweight, simple framework. No custom syntax.
Just a web-components compiler.


## Targets
Build time pre-compiled Web-apps.
Single-page or multi-page. Static sites.
Or in advanced use cases, server-side rendering.


## Tech
* Web-Components (native)
* Typescript
* Deno


## Usefulness
Woblox is minimalist. All that it does, is to pre-compiles pages.
With sets of web-components, into bundles.
The web-component approach, eases page development and maintenance.

Woblox is a good choice for any-size web-apps, with moderate
amounts of functionality. Not heavy complexity.
In these cases, adding a large web framework, adds complexity to
projects. That may be more expensive, than the problems that are solving.

It's useful to get the benefits of web-components. While keeping
things simple. Avoiding custom framework syntax.

It adds zero javascript. There is no "framework syntax" to learn.
The API is small.
For these reasons, it's simpler to learn, use and mantain.
Compared to full feature frameworks.

It can also be used for server-side rendering.
It's great for building static pages, even large ones. That use case is
greatly helped, with its web-components approach.


## Fast
Since pages are pre-built, it's fast. There is no client-side rendering.
Nor any client-side processing.


## Web-Components
Components are defined as `.html` files.

```html
<!-- comps/comp-card.html -->
<template mode="closed">
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
  // This code runs inside the Custom Element class context
  this.addEventListener('click', () => console.log('Clicked!'));
</script>
```