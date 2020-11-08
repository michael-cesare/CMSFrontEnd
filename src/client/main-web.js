import 'core-js'
import React from 'react'
import { hydrate } from 'react-dom'

import { loadableReady } from '@loadable/component'

import WebApp from './WebApp.tsx'

const initApp = () => {
  // TODO - Hydreate issue with the below line: https://github.com/gregberge/loadable-components/issues/423
  // Warning: Did not expect server HTML to contain a <div> in <div>
  console.log(`node: ${document.getElementById('main').innerHTML}`);
  hydrate(<WebApp />, document.getElementById('main'));
  console.log(`loaded: ${document.getElementById('main').innerHTML}`);
};

loadableReady(initApp());
