import 'dotenv/config';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import mongoose from 'mongoose';
import { schema } from './Schema';
import { MyContext } from './MyContext';
const app = express();
const apolloServer = new ApolloServer({
  schema: schema,
  context: ({ req, res }) => ({
    req,
    res,
  }),
});
apolloServer.applyMiddleware({
  app,
});
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGODB_URI!, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB Connected');
    return app.listen(PORT);
  })
  .then(() => {
    console.log(`Server running at PORT: ${PORT}`);
  });