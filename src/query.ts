
export const GQL_QUERY = `
  type Query {
    hello: String
    tasks: [Task]
    task(id: String): Task
    users: [User]
    user(mail: String, password: String): User
    userCount: Int
    userValid(email: String!, password: String!): User  
    contents(site_id: String, content_name: String): [Content]
    contents_uid(site_id: String, content_name: String, user_id: String
    ): [Content]
    content(id: String): Content
    content_count(site_id: String, content_name: String): Int
    note(id: String): Note
    notes: [Note]
    noteTags(noteId: String): [NoteTag]    
  }
`;