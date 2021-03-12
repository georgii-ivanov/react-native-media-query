import React from 'react';

const rules = {};
let styleSheet;

if (typeof window !== 'undefined') {
    styleSheet = (() => {
        const style = document.createElement('style');
        style.id = 'rnwsCSS';
        style.appendChild(document.createTextNode(''));
        document.head.appendChild(style);
        return style.sheet;
    })();
}

export const setRule = (id, text) => {
    if (!hasRule(id, text)) {
        rules[id] = rules?.[id] || {};
        rules[id].text = (rules[id]?.text || '') + text;

        if (styleSheet) {
            styleSheet.insertRule(text);
        }
    }
};

export const hasRule = (id, text) => !!rules[id] && !!rules[id].text?.includes?.(text);

export const collectWebStyles = () =>
    React.createElement('style', {
        id: 'rnws',
        key: 'rnws',
        dangerouslySetInnerHTML: {
            __html: Object.keys(rules)
                .map((key) => rules[key].text)
                .join('\n'),
        },
    });
