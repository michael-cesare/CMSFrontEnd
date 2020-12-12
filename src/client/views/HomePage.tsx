
import React from "react";
import { connect } from 'react-redux';

import { IAppState } from '@redux/models';

import { VMPageTemplatesSel, VMPagePostsSel } from '@client/redux/nodeState/selectors';
import { pageDataSel } from '@redux/page/selectors';

import Page from '@client/components/Page/Page';

import { IPage } from '@client/types';
import { IPageTemplate, IWPPosts } from '@srcTypes/models';

import '@styles/page.scss';

interface IOwnReduxStateProps {
  page: IPage;
  advanceFields: Array<IPageTemplate<any>>;
  pagePosts: Array<IWPPosts>
}

type TAllProps = IOwnReduxStateProps;
class HomePage extends React.PureComponent<TAllProps> {
  render() {
    const { page, advanceFields, pagePosts } = this.props;

    return (
      <div className="homePage">
        <Page
          page={page}
          advanceFields={advanceFields}
          pagePosts={pagePosts}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IAppState): IOwnReduxStateProps => ({
  page: pageDataSel(state),
  advanceFields: VMPageTemplatesSel(state),
  pagePosts: VMPagePostsSel(state),
})

export default connect(mapStateToProps)(HomePage);
