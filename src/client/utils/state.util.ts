export const getInitialState = (): any => {
  const nodeSSRState = typeof window !== 'undefined' && window
  ? (window as any).__INITIAL_STATE__
  : {};

  return nodeSSRState;
};
