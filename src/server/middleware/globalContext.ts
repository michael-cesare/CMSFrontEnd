const globalContext = async (req: any, _res: any, next: any) => {
  const context = {
    pathname: req.url
  }
  global.context = context

  next();
};

export { globalContext };
