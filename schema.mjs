import graphql from 'graphql-tools';
import _ from 'lodash';
import Root from './graphql/root';
import User from './graphql/user';
import Book from './graphql/book';

export default graphql.makeExecutableSchema({
  typeDefs: [...Root.types, ...User.types, ...Book.types],
  resolvers: _.merge({}, Root.resolvers, User.resolvers, Book.resolvers)
});
