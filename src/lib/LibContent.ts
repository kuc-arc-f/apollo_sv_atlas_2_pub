const ObjectID = require('mongodb').ObjectID;
//import LibCommon from "../lib/LibCommon"
import LibMongo from "./LibMongo"
import LibApiFind from "./LibApiFind"
import LibApiCreate from "./LibApiCreate"

export default {
  /* get data items */
  get_items :async function(args: any){
    try {
//console.log(typeof args.user_id )
      let items: any[] = []; 
      if(typeof args.user_id !== 'undefined'){
        const whereUid ={
          site_id: args.site_id, name: args.content_name ,
          user_id: args.user_id
        }
        items = await LibMongo.get_arrayWhere("contents" , whereUid);
      }else{
        const where ={
          site_id: args.site_id, name: args.content_name
        }
        items = await LibMongo.get_arrayWhere("contents" , where);
      }      
      items = LibApiFind.convert_values(items) 
//console.log( items )            
      return items
    } catch (err) {
        throw new Error('Error , get_items');
    }          
  },    
  /* get one record */
  get_item :async function(id: string){
    try {
      const where = { _id: new ObjectID(id) }
//  console.log( where )
      let item = await LibMongo.get_item("contents" , where ) 
      const items = LibApiFind.convert_values([item]) 
      item = items[0]
      item.id = item._id  
//console.log( item ) 
      return item
    } catch (err) {
      throw new Error('Error , get_item');
    }          
  },
  /* count data */
  get_count :async function(args: any){
    try {
      const where ={
        site_id: args.site_id, name: args.content_name
      }
      const ret = await LibMongo.getCount("contents" , where)            
//console.log( ret )            
      return ret
    } catch (err) {
        throw new Error('Error , get_items');
    }          
  },
  /* add data */
  add_item :async function(args: any){
    try {
//console.log(args)
      const where = { key:  args.apikey }
      const key = await LibMongo.get_item("apikeys" , where )
      if(key == null){ throw new Error('Invalid key , apikeys') } 
      const site_id = key.site_id
      const content_name = args.content_name
//console.log(content_name)
      const whereColumn = {
        site_id:  site_id, name: content_name,
      }
      const column = await LibMongo.get_item("columns" , whereColumn ) 
      const coluValues = JSON.parse(column.values || '[]')
      let values = args.values.replace(/'/g , '\"')
      values = JSON.parse(values || '[]')
//console.log(args.values)
      const newData = LibApiCreate.valid_post(values, coluValues)
      const item = {
        name: content_name,
        column_id: column._id.toString(),
        site_id: site_id,
        values: newData,
        user_id: args.user_id,
        created_at: new Date(),
      };  
      const itemOne = await LibMongo.add_item("contents" ,item )
      itemOne.id = itemOne._id
//console.log( itemOne )  
      return itemOne
    } catch (err) {
      console.error(err);
      throw new Error('Error , add_item');
    }          
  },
  /* update data */
  update_item :async function(args: any){
    try {
      const id = args.id
      if(typeof id =='undefined'){
        throw new Error('Invalid , id');
      }
      const where = { key:  args.apikey }
      const key = await LibMongo.get_item("apikeys" , where ) 
      if(key == null){ throw new Error('Invalid key , apikeys') } 
      const site_id = key.site_id
      const whereColumn = {
        site_id:  site_id, name: args.content_name,
      }
      const column = await LibMongo.get_item("columns" , whereColumn )   
      const coluValues = JSON.parse(column.values || '[]')
      let values = args.values.replace(/'/g , '\"')
      values = JSON.parse(values || '[]')
//console.log(values)      
      const newData = LibApiCreate.valid_post(values, coluValues)
      const whereContent = { "_id": new ObjectID( id ) };
      const content = await LibMongo.get_item("contents" , whereContent ) 
      content.values = newData
//console.log( content )
      await LibMongo.update_item("contents" , whereContent, content )       
      return args
    } catch (err) {
      throw new Error('Error , update_item');
    }          
  },
  /* delete data */
  delete_item :async function(args: any){
    try {
      const id = args.id
      if(typeof id =='undefined'){
        throw new Error('Invalid , id');
      }      
      const where = { key:  args.apikey }
      const key = await LibMongo.get_item("apikeys" , where ) 
      if(key == null){ throw new Error('Invalid key , apikeys') }      
      const whereDel = { "_id": new ObjectID( id ) };
      await LibMongo.delete_item("contents" , whereDel )
      return args
    } catch (err) {
      throw new Error('Error , delete_item');
    }          
  },  

}
