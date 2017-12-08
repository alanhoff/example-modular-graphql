import express from 'express';
import graphql from 'express-graphql';
import schema from './schema';

const app = express();

app.use('/graphql', graphql({
  schema,
  graphiql: true
}));

app.listen(8080, () => {
  console.log('Application started at http://localhost:8080/graphql');
});
