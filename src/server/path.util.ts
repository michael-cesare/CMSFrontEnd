import path from 'path';

export const pathResolve = ( from:string, to:string ) => path.resolve( from, __dirname, to );
