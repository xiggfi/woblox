/*
parse.ts

extract component data from component files

Component files are of the form:

```html
<!-- components/comp-card.html -->
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


*/
import { component_data } from "./data.ts"
import { ComponentData } from "./object.ts"



// parses and compiles all web-components
export function compile_components() {
  
}


function parse_component(tag_name: string, raw_html: string) {
    // Simple Regex Extractors (more robust than DOMParser for build-time)
    const template = raw_html.match(/<template>([\s\S]*?)<\/template>/)?.[1] || "";
    const style = raw_html.match(/<style>([\s\S]*?)<\/style>/)?.[1] || "";
    const script = raw_html.match(/<script>([\s\S]*?)<\/script>/)?.[1] || "";

    // Insert data into component_data
    // ...

}
