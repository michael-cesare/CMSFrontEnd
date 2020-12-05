import React, { FC } from "react";

import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import PageBody from './PageBody';

const Layout: FC<any> = () => (
  <div className="layout">
    <Header />
    <PageBody />
    <Footer />
  </div>
);

export default Layout;
