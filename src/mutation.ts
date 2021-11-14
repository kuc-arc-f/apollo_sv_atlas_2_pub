
export const GQL_MUTATION = `
type Mutation {
  addUser(name: String!, email: String!, password: String!): User
  addTask(title: String!): Task
  updateTask(id: String!, title: String!): Task
  deleteTask(id: String!): Task
  addContent(apikey: String!, content_name: String, values: String!
    user_id: String): Content
  updateContent(apikey: String!, id: String!, content_name: String,values: String!
    ): Content
  deleteContent(apikey: String! , id: String!): Content
  noteAdd(title: String!, content: String!, category: String!, noteType: String!): Note
  noteUpdate(id: String!, title: String!, content: String!, 
    category: String!, noteType: String!): Note
  noteDelete(id: String!): Note  
  noteTagAdd(noteId: String!, name: String!): NoteTag  
  noteTagDelete(noteId: String!): String 
}
`;
