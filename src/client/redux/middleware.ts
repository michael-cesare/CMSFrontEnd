export default ( () => () => ( next: any ) => ( _action: any ) => {
  if ( _action ) {
    return next( _action );
  }
} )();
