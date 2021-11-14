
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
import scheme from './scheme'
import LibTask from './lib/LibTask'
import LibUser from './lib/LibUser'
import LibContent from './lib/LibContent'
import LibNote from './lib/LibNote'

const typeDefs = scheme.getTypeDefs();
/* resolvers */
const resolvers = {
  Query: {
    hello: () => 'Hello world-22',
    async tasks(){
      return await LibTask.get_items();
    },
    async task(parent: any, args: any, context: any, info: any){
      return await LibTask.getTask(args.id);
    },
    userCount:async () => {
      return await LibUser.userCount();
    },
    userValid: async(parent: any, args: any, context: any, info: any) => {
      const user = await LibUser.validUser(args);
      return user;
    },
    /* content */
    contents: async (parent: any, args: any, context: any, info: any) => {
      return await LibContent.get_items(args);
    },
    async contents_uid(parent: any, args: any, context: any, info: any){
      return await LibContent.get_items(args);
    },    
    content: async (parent: any, args: any, context: any, info: any) => {
      return await LibContent.get_item(args.id);
    },
    content_count: async (parent: any, args: any, context: any, info: any) => {
      return await LibContent.get_count(args);
    },
    /* notes */
    notes: async () => {
      return await LibNote.getItems();
    },
    note: async (parent: any, args: any, context: any, info: any) => {
      return await LibNote.getItem(args.id);
    },
    noteTags: async (parent: any, args: any, context: any, info: any) => {
      return await LibNote.getNoteTags(args);
    },
  },
  Mutation: {
    addTask: async (parent: any, args: any, context: any) => {
      const ret = await LibTask.addTask(args)
      return ret
    },
    updateTask: async (parent: any, args: any, context: any) => {
      const ret = await LibTask.updateTask(args)
      return ret
    },  
    deleteTask: async (parent: any, args: any, context: any) => {
      const ret = await LibTask.deleteTask(args)
      return ret
    },
    /* user */    
    addUser: async (parent: any, args: any, context: any) => {
      const ret = await LibUser.addUser(args)
      return ret
    },
    /* note */
    noteAdd: async (parent: any, args: any, context: any) => {
      const ret = await LibNote.addItem(args)
      return ret
    },
    noteUpdate: async (parent: any, args: any, context: any) => {
      const ret = await LibNote.noteUpdate(args)
      return ret
    },
    noteDelete: async (parent: any, args: any, context: any) => {
      const ret = await LibNote.noteDelete(args)
      return ret
    },
    noteTagAdd: async (parent: any, args: any, context: any) => {
      const ret = await LibNote.noteTagAdd(args)
      return ret
    }, 
    noteTagDelete: async (parent: any, args: any, context: any) => {
      const ret = await LibNote.noteTagDelete(args)
      return ret
    }, 
    /* content */
    addContent: async (parent: any, args: any, context: any) => {
      const ret = await LibContent.add_item(args)
      return ret
    },
    updateContent: async (parent: any, args: any, context: any) => {
      const ret = await LibContent.update_item(args)
      return ret
    },        
    deleteContent: async (parent: any, args: any, context: any) => {
      const ret = await LibContent.delete_item(args)
      return ret
    },
    
  }
};
/* serever-Start */
const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });
// ENV
//console.log(app.get('env'));
app.listen({ port: 3000 }, () => {
    console.log(`Server ready at http://localhost:3000${server.graphqlPath}`);
  });