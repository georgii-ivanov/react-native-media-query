
import stringHash from 'string-hash';
import createDeclarationBlock from '../utils/create-declaration-block';
import { setRule } from '../inject';
import { isMedia, isRNProp } from '../utils/selector-query-match';

const createStyle = (stylesWithQuery) => {
    let ids = {};

    const cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));
    Object.keys(stylesWithQuery).map((key) => {
        Object.keys(stylesWithQuery[key])
            .filter((key => !isRNProp(key)))
            .map((query) => {
                const css = createDeclarationBlock(stylesWithQuery[key][query]);
                let str;
                const hash = `rnws-${stringHash(`${key}${query}${css}`)}`
                if (isMedia(query)) {
                    str = `${query} {[data-style~="${hash}"] ${css}}`;
                } else {
                    str = `[data-style~="${hash}"]${query} ${css}`;
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
