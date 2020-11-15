import "core-js/stable";
import 'regenerator-runtime/runtime';
import React from 'react'
import { hydrate } from 'react-dom'

import { loadableReady } from '@loadable/component'

import WebApp from './WebApp'

const initApp = () => {
  console.log(`node: ${document.getElementById('main')?.innerHTML}`);
  hydrate(<WebApp />, document.getElementById('main'));
  console.log(`loaded: ${document.getElementById('main')?.innerHTML}`);
};

loadableReady(() => initApp());
