import "core-js/stable";
import 'regenerator-runtime/runtime';
import React from 'react'
import { render } from 'react-dom'

import WebApp from './WebApp'

render(<WebApp />, document.getElementById('main'))
