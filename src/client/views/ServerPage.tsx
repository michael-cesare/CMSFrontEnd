import React from "react";
import { connect } from 'react-redux';

import { IAppState } from '@redux/models';

import { VMPageTemplatesSel, VMPagePostsSel, VMPostsDataSel, VMPostDataSel } from '@client/redux/nodeState/selectors';
import { pageDataSel } from '@redux/page/selectors';

import Page from '@client/components/Page/Page';
import Posts from '@client/components/Posts/Posts';
import Post from '@client/components/Post/Post';

import { IPage } from '@client/types';
import { IPageTemplate, IWPPosts, IWPPost } from '@srcTypes/models';

import '@styles/page.scss';

interface IOwnReduxStateProps {
  page: IPage;
  posts: IWPPosts;
  post: IWPPost;
  advanceFields: Array<IPageTemplate<any>>;
  pagePosts: Array<IWPPosts>
}

type TAllProps = IOwnReduxStateProps;

const ServerPage: React.FC<TAllProps> = (props: TAllProps) => {
  const { page, advanceFields, pagePosts, posts, post } = props;

  const PostNode = () => {
    return post ? (
      <Post
        data={post}
      />
    ) : null;
  }

  const PageNode = () => {
    return page ? (
      <Page
        page={page}
        advanceFields={advanceFields}
        pagePosts={pagePosts}
      />
    ) : null;
  }

  const PostsNodes = () => {
    return posts ? (
      <Posts
        data={posts}
      />
    ) : null;
  }

  return (
    <div className="server-page">
      <PageNode />
      <PostNode />
      <PostsNodes />
    </div>
  );
}


const mapStateToProps = (state: IAppState): IOwnReduxStateProps => ({
  page: pageDataSel(state),
  post: VMPostDataSel(state),
  posts: VMPostsDataSel(state),
  advanceFields: VMPageTemplatesSel(state),
  pagePosts: VMPagePostsSel(state),
})

export default connect(mapStateToProps)(ServerPage);
