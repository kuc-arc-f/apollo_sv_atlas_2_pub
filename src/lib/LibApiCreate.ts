// LibApiCreate

//
export default {
  valid_post: function(data: any, coluValues: any[]){
    const ret:any[] =[]
    coluValues.forEach(function(item: any){
      if(item.name !=""){
//        console.log("name=" ,item.name)
        let d = Object.keys(data).indexOf(item.name)
        if(d !== -1){
          let row ={
            name: item.name, value: data[item.name]
          }
          ret.push( row )
//          console.log("name=" ,item.name, data[item.name] )
        }        
      }
    })
    return ret
  },

}
