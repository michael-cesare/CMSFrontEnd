
import React from "react";
import { connect } from 'react-redux';

import { IAppState } from '@redux/models';

import { pageDataSel } from '@redux/page/selectors';

import Page from '@client/components/Page/Page';

import { IPage } from '@client/types';

import '@styles/page.scss';

interface IOwnReduxStateProps {
  page: IPage;
}

type TAllProps = IOwnReduxStateProps;

class HomePage extends React.Component<TAllProps> {
  render() {
    const { page } = this.props;

    return (
      <div className="homePage">
        <Page
          page={page}
        />
      </div>
    );
  }
}

const mapStateToProps = ( state: IAppState ): IOwnReduxStateProps => ( {
  page: pageDataSel( state ),
} )

export default connect( mapStateToProps )( HomePage );
