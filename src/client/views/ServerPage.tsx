import React from "react";
import { connect } from 'react-redux';

import { IAppState } from '@redux/models';

import { VMPageTemplatesSel, VMPagePostsSel, VMPostsDataSel } from '@client/redux/nodeState/selectors';
import { pageDataSel } from '@redux/page/selectors';

import Page from '@client/components/Page/Page';
import Posts from '@client/components/Posts/Posts';

import { IPage } from '@client/types';
import { IPageTemplate, IWPPosts } from '@srcTypes/models';

import '@styles/page.scss';

interface IOwnReduxStateProps {
  page: IPage;
  posts: IWPPosts;
  advanceFields: Array<IPageTemplate<any>>;
  pagePosts: Array<IWPPosts>
}

type TAllProps = IOwnReduxStateProps;

const ServerPage: React.FC<TAllProps> = (props: TAllProps) => {
  const { page, advanceFields, pagePosts, posts } = props;

  const PagNode = (): JSX.Element => {
    return page && (
      <Page
        page={page}
        advanceFields={advanceFields}
        pagePosts={pagePosts}
      />
    );
  }

  const PostsNodes = (): JSX.Element => {
    return posts && (
      <Posts
        data={posts}
      />
    );
  }

  return (
    <div className="server-page">
      <PagNode />
      <PostsNodes />
    </div>
  );
}


const mapStateToProps = (state: IAppState): IOwnReduxStateProps => ({
  page: pageDataSel(state),
  posts: VMPostsDataSel(state),
  advanceFields: VMPageTemplatesSel(state),
  pagePosts: VMPagePostsSel(state),
})

export default connect(mapStateToProps)(ServerPage);
