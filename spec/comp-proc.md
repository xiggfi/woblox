# Component processing
Woblox components are compiled into script files.
The class name, must be the same component name.
Caps convention: `Component_Name_Class`.


## Woblox Component
Components are defined in this form.
The compiler must pick the "mode" from the <template>.

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
import { comp_init } from "./woblox-comp.ts"  // This import is always included
import { something } from "somescript.ts"   // User imports ...

class Comp_Card extends HTMLElement {
    constructor() {
        super()
        comp_init("comp-card", template, style);
        // ... User code
    }
    // User class code
    // ...
}
</script>
```


## Component script
The Woblox component, gets compiled into a script file.
The script includes:
* Component imports.
* Component class. Name convention: `Component_Class`.
* `comp_init(...)` function, after the super() call.
* Adds Component-setup code, at the end of the script.
  With style and template const.


```ts
import { comp_init } from "./woblox-comp.ts"  // This import is always included
import { something } from "somescript.ts"   // user imports...

class Comp_Card extends HTMLElement {
    constructor() {
        super();
        comp_init("comp-card", template, style);
    }
    // User class code
    // ...    
}

// Framework inserted component-setup code:
customElements.define("comp-card", Comp_Card);
const style = document.createElement("style");
style.textContent = `...`; // here goes the style from the <style> tag
const template = document.getElementById("comp-card").content;
```



## Framework library
This framework library function, is placed in the comps dir,
as `woblox-comp.ts`:


```ts
export function comp_init(name, template, style) {
    const shadowRoot = this.attachShadow({ mode: "closed" });
    let template = document.getElementById(name).content;
    shadowRoot.appendChild(template.cloneNode(true));

    shadowRoot.appendChild(style);
}
```


## Html Page
Web-pages that use Woblox components, are processed:

The template html element, is inserted in compiled web-pages.
At the top of the `<body>`.
The compiler must add the `id` to the template.
With the name in the form: `id="comp-card"`

After all templates, the compiler must insert all required web-component
script tags.
