import {Root} from './Root';
import {User} from './User';
import db from '../database';
import _ from 'lodash';

export const Book = `
  # A data structure representing a book
  type Book {
    # The ID of the book
    id: ID!
    # The title of the book
    title: String!
    # The description
    description: String!
    # The ID of the author
    author_id: ID!
    # The author represented as a User object
    author: User!
    # The karma of the book
    karma: Int!
    # A date representing the creation of the book
    created_at: String!
    # A date representing when the book was last updated
    updated_at: String!
  }

  extend type User {
    # An array containing all books that the user published
    books: [Book!]
  }

  # The type of vote when
  enum VOTE_TYPE {
    # Upvote the book
    UPVOTE
    # Downvote the book
    DOWNVOTE
  }

  # An input payload containing data for voting
  input BookVoteInput {
    # The id of the book
    id: ID!
    # The type of the vote
    type: VOTE_TYPE!
  }

  extend type Mutation {
    # Vote for a book changing it's karma
    voteForBook(data: BookVoteInput!): Book
  }

  extend type Query {
    # Find a single book by it's ID
    findBookById(id: ID!): Book
    # Retrieves all books in the database
    books: [Book!]
  }
`;

const resolvers = {
  Book: {
    author(book) {
      return _.find(db.users, {id: book.author_id});
    }
  },
  User: {
    books(user) {
      return _.filter(db.books, {author_id: user.id});
    }
  },
  Query: {
    findBookById({id}) {
      return _.find(db.books, {id});
    },
    books() {
      return db.books;
    }
  },
  Mutation: {
    voteForBook(_req, {data: {id, type}}) {
      const book = _.find(db.books, {id});

      if (!book) {
        throw new Error('Unable to find the book');
      }

      switch (type) {
        case 'UPVOTE':
          book.karma += 1;
          break;
        case 'DOWNVOTE':
          book.karma -= 1;
          break;
        default:
          throw new Error('Unknown vote type');
      }

      return book;
    }
  }
}

// Export an object with a common interface shared among all schemas
export default {
  types: [Book, Root, User],
  resolvers
}
