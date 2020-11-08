
import React, { Component } from "react";
import { connect } from 'react-redux';

import { IWPPage } from '@srcTypes/models';
import { IAppState } from '@redux/models';

import { pageDataSel } from '@client/redux/nodeState/selectors';
import { pageTypeSel } from '@redux/page/selectors';

import Page from '@components/Page';

interface IOwnReduxStateProps {
  pageData: IWPPage;
  pageType: string;
}

type TAllProps = IOwnReduxStateProps;

class HomePage extends Component<TAllProps> {
  render() {
    const { pageData, pageType } = this.props;

    return (
      <div className="homePage">
        <Page
          pageType={pageType}
          pageData={pageData}
        />
      </div>
    );
  }
}

const mapStateToProps = ( state: IAppState ): IOwnReduxStateProps => ( {
  pageData: pageDataSel( state ),
  pageType: pageTypeSel( state ),
} )

export default connect( mapStateToProps, {} )( HomePage );
