/**
 * @file loadStylesheet.ts
 */

/**
 * Dynamic insert stylesheet to head
 * @param href
 */
const loadStylesheet = (href: string) => {
    return new Promise((resolve, reject) => {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        link.onerror = reject;
        document.getElementsByTagName('head')[0].appendChild(link);
    });
};

export default loadStylesheet;
