import { ApolloServer, gql } from "apollo-server-express";
import { db } from '../lib/db';


const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    resetPassword(email: String!): Boolean!
  }
`;

const resolvers = {
  Query: {
    me: (parent, args, { user }) => user,
  },
  Mutation: {
    resetPassword: async (parent, args, { user }) => {
      const { email } = args;
      const user = await db('user').where({ email }).first('*');
      
      if (user !== undefined) {
        const token = Math.random().toString().split('.')[1]
        await db('token').insert({ user_id: user.id, token: token });
        await sendEmail({ token, email });
        /**
         * Hey! Please reset your password at url.com/reset/${token}
         */
        return true;
      } else {
        return false;
      }
    }
  }
};

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user,
  }),
});
