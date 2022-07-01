const { MongoClient } = require('mongodb');
const client = new MongoClient("mongodb+srv://mobile-website:mobile-website@cluster0.f8kbc.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

async function getClient() {
  return client;
}


async function getdriver(collection_name){
  try {
   // await client.connect();
    const database = client.db("sample");
    const collection = database.collection(collection_name);
   return [collection,client];
  } catch (error){
    console.warn("ERROR: " + error);
    return "error"
  } finally {
    //await client.close();
  }
}
async function insertdata(input,collection_name){
//console.log(input,"input")
  try {
   // await client.connect();
    const database = client.db("sample");
    const collection = database.collection(collection_name);
    //var insertquery=await InsertQueryGeneration(input);

     b=Object.keys(input)
var query={}
    for( var i in b){
      if(b[i]=="insert"){
        continue
      }
      query[[b[i]]]=input[[b[i]]]
      
    }

    query.create_ts=Date.now()
    query.update_ts=Date.now()
var insert_status=await collection.insertOne(query)
   console.log(insert_status)
   return "inserted";
  } catch (error){
    console.warn("ERROR: " + error);
    return "present"
 //   if (errCallback) errCallback(error);
 
  } finally {
   // await client.close();
  }
  
}
async function updatedata(input,collection_name,primarykey_fields){
  //console.log(input,"input")
    try {
     // await client.connect();
      const database = client.db("sample");
      const collection = database.collection(collection_name);
var query={}
      for(i in primarykey_fields){
        query[[primarykey_fields[i]]]=input[[primarykey_fields[i]]]
        
      }
       b=Object.keys(input)
  update_query={}
      for(i in b){
        if(b[i] in primarykey_fields || b[i]=="update" || b[i]=="upsert" || b[i]=="insert"){
          continue
        }
        update_query[[b[i]]]=input[[b[i]]]
        
      }
      if(input.insert){
       
        update_query.create_ts=Date.now();
        update_query.update_ts=Date.now();
      }
      if(input.update){
        update_query.update_ts=Date.now()
      }
  const update = { $set: update_query};
  if(input.upsert){
    var options={upsert:true}
  }
  else{
  var options = {};}
  var update_status=await collection.updateOne(query, update, options);
 console.log(update_status)
  return update_status;
    } catch (error){
      console.warn("ERROR: " + error);
      if (errCallback) errCallback(error);
    } finally {
      //await client.close();
    }
    
  }
  async function fetchdata(input,collection_name,fetch_fields) { 
    try {
      //await client.connect();
      const database =client.db("sample");
      
      const collection = database.collection(collection_name);
      /*if(collection_name=="candidatedata" && input.user_id){
        input._id=input.user_id
        delete input.user_id
      }*/
     
      var find_query={}
      for(i in fetch_fields){
        find_query[[fetch_fields[i]]]=input[[fetch_fields[i]]]
        
      }
    
      const cursor = await collection.find(find_query);
let items = [];
      await cursor.forEach(function(doc){
        items.push(doc);
      });
    
      return items;
    } catch (error){
      console.log(error)
      console.warn("ERROR: " + error);
      if (errCallback) {
      console.log("fetch error")
      errCallback(error)};
    } finally {
     // await client.close();
    }
    
  }
  async function deleterecord(input,collection_name,primarykey_fields){
    try {
     // await client.connect();
      const database = client.db("sample");
      const collection = database.collection(collection_name);
var query={}
      for(i in primarykey_fields){
        query[[primarykey_fields[i]]]=input[[primarykey_fields[i]]]
        
      }
  // console.log(query)
  
  var delete_status=await collection.deleteOne(query);
 //console.log(delete_status)
  return delete_status;
    } catch (error){
      console.warn("ERROR: " + error);
      if (errCallback) errCallback(error);
    } finally {
    //  await client.close();
    }
  }

module.exports={
  fetchdata,insertdata,updatedata,deleterecord,getdriver,getClient
}