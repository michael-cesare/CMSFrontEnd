import path from 'path';

export const pathResolve = ( location:string ) => path.resolve( '/lib', __dirname, `../${location}` );
