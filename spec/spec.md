# Project Kyanite Specification

A minimalist, compiler-first web framework for building component-based websites using Deno and Native Web Components.

## 1. Core Concept
Kyanite is a **Build-Time Framework**. It transforms a directory of `.html` components and a "Page" template into a single, optimized distribution folder. It avoids a heavy runtime library by leveraging native Browser **Custom Elements**.

## 2. Technical Stack
*   **Runtime:** Deno
*   **Language:** TypeScript
*   **Target:** Modern Browsers (ES Modules, Custom Elements)

## 3. The Component Format (`.html`)
Components are stored as `.html` files. They use a standard tag structure:
Component name is taken from the filename.
A dash symbol in the component name, is not required. But could be a good idea.
(If you want to adhere to web standards).


```html
<!-- components/card.html -->
<template>
  <div>
    <slot></slot> <!-- Native slot for transclusion -->
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

## 4. The Page Definition
The input page is a standard HTML file that references components by their file names.

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html>
<body>
    <card>
        <h1>Hello World</h1>
    </card>
</body>
</html>
```

## 5. Compilation Pipeline (The "Build")
The Kyanite Compiler performs the following steps:

1.  **Discovery:** Scans the `components/` folder.
2.  **Parsing:** Extracts `<template>`, `<style>`, and `<script>` from each component.
3.  **Generation:** 
    *   Creates a `components.js` file containing the `customElements.define` logic for every component found.
    *   Wraps the `<script>` content into the `connectedCallback` of the Web Component.
4.  **Injection:** Injects a single `<script src="components.js" type="module">` into the head of the output HTML.

## 6. Directory Structure
```text
my-project/
├── components/       # Component fragments
│   ├── nav-bar.html
│   └── user-card.html
├── src/
│   └── index.html    # The page template
├── build.ts          # The script using Kyanite API
└── dist/             # Generated output (The "Compiled" page)
```

## 7. Suggested API (for `build.ts`)

```typescript
import { Kyanite } from "https://deno.land/x/kyanite/mod.ts";

// These dirnames are the default.
// If the defaults are used, no need to provide them:
//    const app = new Kyanite();
const app = new Kyanite({
  components_dir: "./comps",
  source_dir: "./src",
  output_dir: "./dist"
});

await app.build();
```

---

### Part 4: Improved Prototype Logic

To help you get started, here is how the **Compiler** logic should look in Deno (handling the file strings):

```typescript
// compiler/mod.ts
export function compileComponent(tagName: string, rawHtml: string): string {
  // Simple Regex Extractors (more robust than DOMParser for build-time)
  const template = rawHtml.match(/<template>([\s\S]*?)<\/template>/)?.[1] || "";
  const style = rawHtml.match(/<style>([\s\S]*?)<\/style>/)?.[1] || "";
  const script = rawHtml.match(/<script>([\s\S]*?)<\/script>/)?.[1] || "";

  return `
    customElements.define('${tagName}', class extends HTMLElement {
      constructor() {
        super();
        this.attachShadow({ mode: 'open' }).innerHTML = \`
          <style>${style}</style>
          ${template}
        \`;
      }
      connectedCallback() {
        const host = this.shadowRoot;
        (function() { 
          ${script} 
        }).call(this);
      }
    });
  `;
}
```

