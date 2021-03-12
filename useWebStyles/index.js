import { Dimensions } from 'react-native';
import mediaQuery from 'css-mediaquery';

const isMedia = (str) => str.indexOf('@media') === 0;

const createStyle = (stylesWithQuery) => {
    let cleanStyles = JSON.parse(JSON.stringify(stylesWithQuery));
    Object.keys(stylesWithQuery).map((key) => {
        Object.keys(stylesWithQuery[key])
            .map((str) => {
                if (isMedia(str)) {
                    const mqStr = str.replace('@media', '');
                    const isMatch = mediaQuery.match(mqStr, {
                        width: Dimensions.get('window').width,
                    });
                    if (isMatch) {
                        cleanStyles = {
                            ...cleanStyles,
                            [key]: { ...cleanStyles[key], ...stylesWithQuery[key][str] },
                        };
                    }
                }

                delete cleanStyles[key][str];
            });
    });
    return cleanStyles;
};

export const useWebStyles = (stylesWithQuery) => {
    const styles = createStyle(stylesWithQuery);
    return [{}, styles];
};
