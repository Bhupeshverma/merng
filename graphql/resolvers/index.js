const postResolvers = require('./posts');
const userReolvers = require('./users');
const commentResolvers = require('./comments')


module.exports = {
    Post: {
        likeCount: (parent) => parent.likes.length,
        commentCount: (parent) => parent.comments.length 
    },
    Query: {
        ...postResolvers.Query,
    },
    Mutation: {
        ...userReolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation
    },
    Subscription: {
        ...postResolvers.Subscription
    }
}