import 'core-js'
import React from 'react'
import { render } from 'react-dom'

import WebApp from './WebApp.tsx'

initApp = () => {
  render(<WebApp />, document.getElementById('main'))
};

initApp();
