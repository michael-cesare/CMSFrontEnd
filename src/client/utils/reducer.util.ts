const reducerUtil = ( initialState: any | undefined, handlers: any ) => function reducer ( state: any | undefined = initialState, action: any ) {
  if ( handlers.hasOwnProperty( action.type ) ) {
    return handlers[action.type]( state, action );
  } else {
    return state;
  }
};

export default reducerUtil;
