import { setRule } from '../inject';
import createDeclarationBlock from '../utils/create-declaration-block';
import stringHash from "string-hash"

const isMedia = (str) => str.indexOf('@media') === 0;

const createStyle = (stylesWithQuery) => {
    let ids = {};

    const cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));
    Object.keys(stylesWithQuery).map((key) => {
        Object.keys(stylesWithQuery[key])
            .map((query) => {
                const css = createDeclarationBlock(stylesWithQuery[key][query]);
                let str;
                const hash = `rnws-${stringHash(`${key}${query}${css}`)}`
                if (isMedia(query)) {
                    str = `${query} {[data-webstyle~="${hash}"] ${css}}`;
                } else {
                    str = `[data-webstyle~="${hash}"]${query} ${css}`;
                }
                ids = { ...ids, [key]: hash };

                setRule(`${hash}`, str);
                delete cleanStyles[key][query];
            });
    });
    return { ids, cleanStyles };
};

export const useWebStyles = (stylesWithQuery) => {
    const { ids, cleanStyles } = createStyle(stylesWithQuery);
    return [ids, cleanStyles];
};
