## The Component Format (`.html`)
Components are stored as `.html` files. They use a standard tag structure.
They benefit from `.html` syntax highlight, in code editors.
Component name is taken from the filename.
A dash symbol in the component name, is required.
Comps dir may have sub-dirs, but its hierarchy is meaningless. Names must be unique.
This file, is called "component definition file", or "Woblox component".

```html
<!-- comps/comp-card.html -->
<template id="comp-card">
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
    //
    // This is copied into the component script file.
    //

    class CompCard extends HTMLElement {
        constructor() {
            // Always call super first in constructor (?)
            super();
        }
        // Element functionality written in here
    }
    
    customElements.define("comp-card", CompCard);
    
    const shadowRoot = this.attachShadow({ mode: "closed" });
    let template = document.getElementById("comp-card").content;
    shadowRoot.appendChild(template.cloneNode(true));

</script>
```

The framework compiles them, into `.ts` files, and a `<template>` tag.


## The Page Definition
The input page is a standard HTML file that references components by their file names.

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html>
<body>
    <comp-card>
        <h1>Hello World</h1>
    </comp-card>
</body>
</html>
```

