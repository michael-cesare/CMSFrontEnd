declare module '*.scss' {
    const content: {[className: string]: string};
    export default content;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}
declare module '*.png' {
  const value: any;
  export default value;
}
declare module '*.svg' {
  const value: any;
  export default value;
}

interface GlobalContext {
  pathname: string;
}

declare namespace NodeJS{
  interface Global {
    context: GlobalContext;
  }
}
