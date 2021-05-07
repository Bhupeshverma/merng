import { useMutation } from '@apollo/client'
import gql from 'graphql-tag'
import React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { FETCH_POSTS_QUERY } from '../util/graphql'
import { useForm } from '../util/hooks'

export default function PostForm() {
    const { values, onChange, onSubmit } = useForm(createPostCallback, {
        body: ''
    })
    
    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update(proxy, result) {
            console.log(result);
            const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });
            proxy.writeQuery({
              query: FETCH_POSTS_QUERY,
              data: {
                getPosts: [result.data.createPost, ...data.getPosts],
              },
            }); 
            values.body = ' ';
        }
    })
    function createPostCallback() {
        createPost()
    }
    
    return (
        <Form onSubmit={onSubmit}>
            <h2>Create a post</h2>
            <Form.Field>
                <Form.Input
                    placeholder="Hi World!"
                    name="body"
                    onChange={onChange}
                    value={values.body}
                />
                <Button type="submit" color="teal">
                    Submit
                    </Button>
            </Form.Field>
        </Form>
    )
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body){
      id
      body
      createdAt
      username
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;
