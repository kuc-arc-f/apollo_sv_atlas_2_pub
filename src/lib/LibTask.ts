var ObjectID = require('mongodb').ObjectID;
import LibCommon from "./LibCommon"
import LibMongo from "./LibMongo"
import LibApiFind from "./LibApiFind"

export default {
  get_items :async function(){
    try {
      const client = await LibMongo.getClient();
      const dbName = LibMongo.get_db_name();
//console.log(d);
      const collection = client.db(dbName).collection("tasks");
      let items = await collection.find({}).toArray();
      items = LibApiFind.convertItems(items);
console.log( items);
      client.close();             
      return items
    } catch (err) {
        throw new Error('Error , get_items');
    }          
  },    
  getTask :async function(id: number){
    try {
      const where = { _id: new ObjectID(id) }
      const dbName = LibMongo.get_db_name();
      const client = await LibMongo.getClient();
      const collection = client.db(dbName).collection("tasks");
      const item = await collection.findOne(where) ;
      client.close();
      if(item !== null){
        item.id = item._id;
      }  
//console.log( item)       
      return item;
    } catch (err) {
      throw new Error('Error , getTask');
    }          
  },
  addTask :async function(args: any){
    try {
//console.log( args); 
      const item: any = {
        title: args.title ,  
        content: "",
        created_at: new Date(),
      };
      const dbName = LibMongo.get_db_name();
      const client = await LibMongo.getClient();
      const collection = client.db(dbName).collection("tasks");
      const itemOne = await collection.insertOne(item); 
      client.close();
      item.id = item._id   
//console.log(item); 
      return item;
    } catch (err) {
      throw new Error('Error , addTask');
    }          
  },
  updateTask :async function(args: any){
    try {
//console.log( args); 
      const where = {"_id": new ObjectID( args.id )};
      const item: any = {
        title: args.title ,  
      };
      const dbName = LibMongo.get_db_name();
      const client = await LibMongo.getClient();
      const collection = client.db(dbName).collection("tasks");
      await collection.updateOne(where, { $set: item })
      client.close();
//console.log(item); 
      return args;
    } catch (err) {
      throw new Error('Error , updateTask');
    }          
  },  
  deleteTask :async function(args: any){
    try {
console.log( args); 
      const dbName = LibMongo.get_db_name();
      const where = {"_id": new ObjectID( args.id )};
      const client = await LibMongo.getClient();
      const collection = client.db(dbName).collection("tasks");
      await collection.deleteOne(where) 
      client.close();
//console.log(item); 
      return args;
    } catch (err) {
      throw new Error('Error , deleteTask');
    }          
  },             
}
