// The schema must contain types and a type cannot be declared without fields
// so the Root definition contains only a simple ping -> pong logic as a placeholder
export const Root = `
  schema {
    query: Query
    mutation: Mutation
  }

  # The main query type
  type Query {
    # Returns a string containing pong
    ping: String!
  }

  # The main mutation interface
  type Mutation {
    # Returns a string containing pong
    ping: String!
  }
`;

// Create resolvers for the ping/pong logic
const resolvers = {
  Query: {
    ping: () => 'pong'
  },
  Mutation: {
    ping: () => 'pong'
  }
};

// Export an object with a common interface shared among all schemas
export default {
  types: [Root],
  resolvers
}
