import "core-js/stable";
import 'regenerator-runtime/runtime';
import React from 'react'
import { hydrate } from 'react-dom'

import { loadableReady } from '@loadable/component'

import WebApp from './WebApp'

const initApp = () => {
  hydrate(<WebApp />, document.getElementById('main'));
};

loadableReady(() => initApp());
