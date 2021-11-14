var ObjectID = require('mongodb').ObjectID;
import LibCommon from "./LibCommon"
import LibMongo from "./LibMongo"
import LibApiFind from "./LibApiFind"

interface INoteTag {
  noteId: number,
  name: string,
}
interface ICategory {
  noteId: number,
  name: string,
}
interface IArgs {
  id: number,
  title: string,
  content: string,
}
//
const LibNote = {
  getItems :async function(){
    try {
      const client = await LibMongo.getClient();
      const dbName = LibMongo.get_db_name();
      const collection = client.db(dbName).collection("notes");
      let items = await collection.find({}).toArray();
      items = LibApiFind.convertItems(items);      
//console.log(items);
      return items;
    } catch (err) {
      throw new Error('Error , getItems');
    }          
  },
  getItem :async function(id: string){
    try {
      const where = { _id: new ObjectID(id) }
      const dbName = LibMongo.get_db_name();
      const client = await LibMongo.getClient();
      const collection = client.db(dbName).collection("notes");
      const item = await collection.findOne(where) ;
      client.close();
      if(item !== null){
        item.id = item._id;
      }  
//console.log( item)       
      return item;
    } catch (err) {
      throw new Error('Error , getItem');
    }          
  },
  addItem :async function(args: any){
    try {
      const client = await LibMongo.getClient();
      const dbName = LibMongo.get_db_name();
//console.log(d);
      const collection = client.db(dbName).collection("notes");
      const item: any = {
        title: args.title,
        content: args.content,
        userId: "",
        category: args.category,
        noteType: args.noteType,
        created_at: new Date(),
      }
      const itemOne = await collection.insertOne(item); 
      client.close();
      item.id = item._id 
// console.log( item)            
      return item;
    } catch (err) {
      console.error(err);
      throw new Error('Error , addItem');
    }          
  },
  noteUpdate :async function(args: any){
    try {
console.log(args);
      const where = {"_id": new ObjectID( args.id )};
      const item: any = {
        title: args.title , 
        content: args.content,
        category: args.category,
        noteType: args.noteType,         
      };
      const dbName = LibMongo.get_db_name();
      const client = await LibMongo.getClient();
      const collection = client.db(dbName).collection("notes");
      await collection.updateOne(where, { $set: item })
      client.close();
      return args;
    } catch (err) {
      console.error(err);
      throw new Error('Error , noteUpdate');
    }          
  },
  noteDelete :async function(args: IArgs){
    try {
      const dbName = LibMongo.get_db_name();
      const where = {"_id": new ObjectID( args.id )};
      const client = await LibMongo.getClient();
      const collection = client.db(dbName).collection("notes");
      await collection.deleteOne(where) 
      client.close();      
      return args
    } catch (err) {
      console.error(err);
      throw new Error('Error , noteDelete');
    }          
  }, 
  noteTagAdd :async function(args: any){
    try {
      const client = await LibMongo.getClient();
      const dbName = LibMongo.get_db_name();
//console.log(d);
      const collection = client.db(dbName).collection("noteTags");
      const noteId = args.noteId;
      const item: any = {
        noteId : new ObjectID(noteId),
        name: args.name,
      }
      const itemOne = await collection.insertOne(item); 
      client.close();
      item.id = item._id 
      return item
    } catch (err) {
      console.error(err);
      throw new Error('Error , noteTagAdd');
    }          
  },
  getNoteTags :async function(args: any ){
    try {
      const noteId = args.noteId;
//console.log(noteId);
      const where = { noteId: new ObjectID(noteId) }
      const client = await LibMongo.getClient();
      const dbName = LibMongo.get_db_name();
      const collection = client.db(dbName).collection("noteTags");
      let items = await collection.find(where).toArray();
//console.log(items);
      items = LibApiFind.convertItems(items);      
      return items;
    } catch (err) {
      console.error(err);
      throw new Error('Error , getNoteTags');
    }          
  },  
  noteTagDelete :async function(args: any ){
    try {
      const noteId = args.noteId;
console.log(noteId);
      const where = { noteId: new ObjectID(noteId) }
      const client = await LibMongo.getClient();
      const dbName = LibMongo.get_db_name();
      const collection = client.db(dbName).collection("noteTags");
      let items = await collection.find(where).toArray();
console.log(items);
      for (const item of items) {
        let whereTag = {"_id": new ObjectID( item._id )};
        await collection.deleteOne(whereTag) 
      }  
      return noteId
    } catch (err) {
      throw new Error('Error , noteTagDelete');
    }          
  },  
 
}
export default LibNote;

