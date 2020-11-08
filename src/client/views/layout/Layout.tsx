import React, { FC } from "react";

import PageBody from './PageBody';
import Header from './Header';
import Footer from './Footer';

const Layout: FC<any> = () => (
  <div className="layout" >
    <Header />
    <PageBody />
    <Footer />
  </div>
);

export default Layout;
