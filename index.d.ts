declare module 'react-native-web-styles' {
  const collectWebStyles: () => string;
  const useWebStyles: (styles: StyleProp) => [{ [key: string]: string }, StyleProp];
  export { useWebStyles, collectWebStyles };
}
