



# Prototype Logic

Here is how the **Compiler** logic should look in Deno (handling the file strings):

```typescript
// compiler/mod.ts
export function compileComponent(tagName: string, rawHtml: string): string {
  // Simple Regex Extractors (more robust than DOMParser for build-time)
  const template = rawHtml.match(/<template>([\s\S]*?)<\/template>/)?.[1] || "";
  const style = rawHtml.match(/<style>([\s\S]*?)<\/style>/)?.[1] || "";
  const script = rawHtml.match(/<script>([\s\S]*?)<\/script>/)?.[1] || "";

  // This section still needs to be reviewed.
  // It may not be what's needed.
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