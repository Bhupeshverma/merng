const postResolvers = require('./posts');
const userReolvers = require('./users');



module.exports = {
    Query: {
        ...postResolvers.Query
    },
    Mutation: {
        ...userReolvers.Mutation
    }
}