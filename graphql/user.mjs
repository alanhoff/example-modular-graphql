import uuid from 'uuid';
import db from '../database';
import {Root} from './root';
import _ from 'lodash';

export const User = `
  # An user object containing important data
  type User {
    # The identification
    id: ID!
    # The full name
    name: String!
    # The main email
    email: String!
    # An ISO Date containing the creating date
    created_at: String
    # An ISO Date containing the update date
    updated_at: String
  }

  # An input payload containing data for user creation
  input CreateUserInput {
    # The full name of the new user
    name: String!
    # The email of the new user
    email: String!
  }

  extend type Query {
    # Finds an user by it's ID
    findUserById(id: String!): User
    # Find all users in the system
    users: [User!]
  }

  extend type Mutation {
    # Creates a new user
    createUser(data: CreateUserInput!): User
  }
`;

const resolvers = {
  Query: {
    findUserById: ({id}) => {
      return _.find(db.users, {id});
    },
    users: () => db.users
  },
  Mutation: {
    createUser: (_req, {data: {name, email}}) => {
      if (_.find(db.users, {email})) {
        throw new Error('Email already registered')
      }

      const user = {
        id: uuid.v4(),
        name,
        email,
        created_at: new Date(),
        updated_at: new Date()
      }

      db.users.push(user);
      return user;
    }
  }
}

// Export an object with a common interface shared among all schemas
export default {
  types: [User, Root],
  resolvers
}
