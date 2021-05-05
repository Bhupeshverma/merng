import React from 'react'
import { gql, useQuery } from "@apollo/client";
import { Grid } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
// import gql from "graphql-tag";

const Home = () => {
    const { loading, data: { getPosts: posts } } = useQuery(FETCH_POSTS_QUERY);
    if (posts) {
        console.log(posts);
        
    }
    return (
      <Grid columns={3}>
        <Grid.Row className="page-title">
          <h1>Recent posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading...</h1>
          ) : posts ? (
            posts.map((post) => (
              <Grid.Column key={post.id} style={{marginBottom: 20}}>
                <PostCard post={post} />
              </Grid.Column>
            ))
          ) : (
            ""
          )}
        </Grid.Row>
      </Grid>
    );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts{
      id
      body
      username
      createdAt
      comments {
        id
        username
        body
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      commentCount
      likeCount
    }
  }
`;

export default Home
