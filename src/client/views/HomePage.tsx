
import React from "react";
import { connect } from 'react-redux';

import { IAppState } from '@redux/models';

import { VMPageTemplatesSel } from '@client/redux/nodeState/selectors';
import { pageDataSel } from '@redux/page/selectors';

import Page from '@client/components/Page/Page';

import { IPage } from '@client/types';
import { IPageTemplate } from '@srcTypes/models';

import '@styles/page.scss';

interface IOwnReduxStateProps {
  page: IPage;
  advanceFields: IPageTemplate[];
}

type TAllProps = IOwnReduxStateProps;

class HomePage extends React.Component<TAllProps> {
  render() {
    const { page, advanceFields } = this.props;

    return (
      <div className="homePage">
        <Page
          page={page}
          advanceFields={advanceFields}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState): IOwnReduxStateProps => ({
  page: pageDataSel(state),
  advanceFields: VMPageTemplatesSel(state),
})

export default connect(mapStateToProps)(HomePage);
