// Build Step Module
//
// The step module handles the creation of the
// intermediate-step files.
// These are the web-page, with the web-components
// templates at the top of the body.
// And the web-components scripts addeds as ts files.

import { exists } from "jsr:@std/fs";
import { config, page_data, component_data } from "../state.ts";
import { load_file, write_file } from "../file/file.ts";
import { get_components } from "../page.ts";


export async function build_page() {
    await ensure_framework_lib();
    for (const pageName of config.pages) {
        await process_page(pageName);
    }
}


// Needs update
// * verify path
// * Replaced with a file copy ?
//
// May alternatively be implemented as a text resource import:
// import woblox_lib from "./build/woblox-comp.ts" with { type: "text" };
async function ensure_framework_lib() {
    const libPath = `${config.dir_build}/${config.dir_comps}/woblox-comp.ts`;

    // if file doesn't exist, create it
    if (await exists(libPath)) return

    // We could read from a file or just have the content here.
    // Given it's a small framework lib, let's just write it.
    const content = `export function comp_init(comp, name, template, style) {
    const templateEl = document.getElementById(name);
    const mode = templateEl?.getAttribute("mode") || "open";
    const shadowRoot = comp.attachShadow({ mode });
    shadowRoot.appendChild(template.cloneNode(true));
    shadowRoot.appendChild(style);
}
`;
    await write_file(libPath, content);
}

async function process_page(pageName: string) {
    const pagePath = `${config.dir_src}/${pageName}`;

    // Determine required components for the page.
    const requiredComponents = await get_required_components(pagePath);

    // Check page timestamps. To determine if the page needs a build.
    // If not, skip the page.
    const needsBuild = await check_if_page_needs_build(pageName, requiredComponents);
    if (!needsBuild) {
        return; // Skip this page
    }

    let pageHtml = await load_file(pagePath);
    let templatesHtml = "";
    let scriptsHtml = "";

    for (const tagName of requiredComponents) {
        const compParts = await process_component(tagName);
        if (compParts) {
            templatesHtml += compParts.templateHtml + "\n";
            scriptsHtml += compParts.scriptHtml + "\n";
        }
    }

    const injectedHtml = templatesHtml + "\n" + scriptsHtml;
    // Generate the page file. In `build` dir.
    await generate_page_file(pageName, pageHtml, injectedHtml);
}

async function get_required_components(pagePath: string): Promise<string[]> {
    return await get_components(pagePath);
}

async function check_if_page_needs_build(pageName: string, requiredComponents: string[]): Promise<boolean> {
    const pageData = page_data[pageName];
    if (!pageData) return true; // Safety fallback

    // If the page source is newer than its build, it needs a build
    if (pageData.source_file_time > pageData.build_time) {
        return true;
    }

    // If any required component is newer than the page's build, the page needs a build
    for (const tagName of requiredComponents) {
        const comp = component_data[tagName];
        if (comp && comp.source_file_time > pageData.build_time) {
            return true;
        }
    }

    return false;
}

async function process_component(tagName: string): Promise<{ templateHtml: string, scriptHtml: string } | null> {
    const comp = component_data[tagName];
    if (!comp) return null;

    // Check component timestamps. To determine if the components need a build.
    const needsBuild = check_if_component_needs_build(tagName);
    const rawHtml = await load_file(comp.file_path);
    const parts = parse_component(rawHtml);

    if (needsBuild) {
        // Generate the component scripts files. In `build/comps` dir.
        await generate_component_script(tagName, parts.script, parts.style);
        // Update the component "build" timestamp
        comp.build_time = Date.now();
    }

    // Prepare the HTML to inject into the page
    return format_component_injection(tagName, parts.templateAttrs, parts.template);
}

function check_if_component_needs_build(tagName: string): boolean {
    const comp = component_data[tagName];
    if (!comp) return false;
    return comp.source_file_time > comp.build_time;
}

interface ParsedComponent {
    templateAttrs: string;
    template: string;
    style: string;
    script: string;
}

function parse_component(raw_html: string): ParsedComponent {
    // Robust extraction for build-time
    const templateMatch = raw_html.match(/<template([^>]*)>([\s\S]*?)<\/template>/i);
    const styleMatch = raw_html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
    const scriptMatch = raw_html.match(/<script[^>]*>([\s\S]*?)<\/script>/i);

    return {
        templateAttrs: templateMatch ? templateMatch[1] : "",
        template: templateMatch ? templateMatch[2] : "",
        style: styleMatch ? styleMatch[1] : "",
        script: scriptMatch ? scriptMatch[1] : ""
    };
}

async function generate_component_script(tagName: string, scriptContent: string, styleContent: string) {
    const className = tagName.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('_');
    const styleEscaped = styleContent.trim().replace(/\\/g, "\\\\").replace(/`/g, "\\`").replace(/\$/g, "\\$");

    let finalScript = scriptContent.trim();
    // Fix comp_init call to include 'this' context
    //finalScript = finalScript.replace(/comp_init\s*\(/g, "comp_init.call(this, ");
    //finalScript += "\n\n";

    finalScript += `// Framework inserted component-setup code:\n`;
    finalScript += `const style = document.createElement("style");\n`;
    finalScript += `style.textContent = \`${styleEscaped}\`;\n`;
    finalScript += `const template = document.getElementById("${tagName}").content;\n`;
    finalScript += `customElements.define("${tagName}", ${className});\n`;

    const buildPath = `${config.dir_build}/comps/${tagName}.ts`;
    await write_file(buildPath, finalScript);
}

function format_component_injection(tagName: string, templateAttrs: string, template: string): { templateHtml: string, scriptHtml: string } {
    let templateHtml = `<!-- Component: ${tagName} -->\n`;
    templateHtml += `<template id="${tagName}"${templateAttrs}>\n`;
    templateHtml += `${template.trim()}\n</template>`;

    let scriptHtml = `<script src="comps/${tagName}.ts" type="module"></script>`;
    return { templateHtml, scriptHtml };
}

async function generate_page_file(pageName: string, pageHtml: string, injectedHtml: string) {
    const bodyRegex = /(<body[^>]*>)/i;
    let newPageHtml = pageHtml;

    if (bodyRegex.test(pageHtml)) {
        newPageHtml = pageHtml.replace(bodyRegex, `$1\n${injectedHtml}`);
    } else {
        // Fallback if no <body> tag is found
        newPageHtml = injectedHtml + '\n' + pageHtml;
    }

    const buildPath = `${config.dir_build}/${pageName}`;
    await write_file(buildPath, newPageHtml);

    // Update page build time
    if (page_data[pageName]) {
        page_data[pageName].build_time = Date.now();
    }
}