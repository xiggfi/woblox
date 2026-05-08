// woblox-comp.ts
//
// Library code to put with build project
// Currently NOT used
// May be used somehow, in future update.

export function comp_init(name, template, style) {
    const shadowRoot = this.attachShadow({ mode: "closed" });
    shadowRoot.appendChild(template.cloneNode(true));
    shadowRoot.appendChild(style);