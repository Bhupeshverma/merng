import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Label } from "semantic-ui-react";

export default function LikeButton({ user, post: { id, likes, likeCount } }) {
    const [liked, setliked] = useState(false)
    useEffect(() => {
        if (user && likes.find(like => like.username === user.username)) {
            setliked(true)
        } else {
            setliked(false)
        }
    }, [user, likes]);
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: {postId: id}
    })
    
    const likeButton = user ? (
      liked ? (
        <Button color="teal">
          <Icon name="heart" />
        </Button>
      ) : (
        <Button basic color="teal">
          <Icon name="heart" />
        </Button>
      )
    ) : (
      <Button basic color="teal" as={Link} to="/login">
        <Icon name="heart" />
      </Button>
    );
    return (
      <Button as="div" labelPosition="right" onClick={likePost}>
        {likeButton}
        <Label basic color="teal" pointing="left">
          {likeCount}
        </Label>
      </Button>
    );
}

const LIKE_POST_MUTATION = gql`
 mutation likePost($postId: ID!) {
     likePost(postId: $postId){
         id
         likes{
             id
             username
         }
         likeCount
     }
 }
`
