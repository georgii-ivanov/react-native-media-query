# react-native-web-styles
Adds support for media queries in react-native/react-native-web, `:hover` and other pseudoslectors for react-native-web, triggers on device orientation changes and also works with next.js static generation or server-side rendering.
# Installation

`yarn add react-native-web-styles`
or
`npm install react-native-web-styles --save`
# Usage
```javascript
import { useWebStyles } from 'react-native-web-styles';

//note that StyleSheet.create shouldn't be used here
const styles = {
    example: {
        backgroundColor: 'green',
        '@media (max-width: 1600px)': {
            backgroundColor: 'red',
        },
        '@media (max-width: 800px)': {
            backgroundColor: 'blue',
        },
    }
}

const [ids, styles] = useWebStyles(styles);

...

// for react-native-web 0.13+
<Component style={styles.example} dataSet={{ webstyle: ids.example }} />

// for older react-native-web
<Component style={styles.example} data-webstyle={ids.example} />

```

# react-native-web with next.js

Update your _document.js like example below. Further usage is exactly the same like shown above.

```javascript
import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { collectWebStyles } from 'react-native-web-styles';
import { AppRegistry } from 'react-native-web';

export default class CustomDocument extends Document {
    static async getInitialProps({ renderPage }) {
        AppRegistry.registerComponent('Main', () => Main);
        const { getStyleElement } = AppRegistry.getApplication('Main');
        const styles = [
            getStyleElement(),
            collectWebStyles(),
        ];
        return { ...renderPage(), styles: React.Children.toArray(styles) };
    }

    render(){
        ...
    }
```