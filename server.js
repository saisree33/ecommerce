var express = require("express") ;
var cors = require("cors");
var { graphqlHTTP } = require("express-graphql");
var schema = require("./src/schema") ;
var root = require("./src/resolver");

const {getClient,fetchdata}=require("./src/connection/mongo") 
var app = express();
app.use(cors());

app.use(function(req, res, next) { 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); 
    next(); });

  
app.use( "/graphql", graphqlHTTP({ schema: schema, rootValue: root, graphiql: true}));

//"NODE_ENV=development nodemon --exec babel-node server.js"
app.get("/", (req, res) => { res.send("Welcome to ecommerce app"); });

app. listen(4000, () => {
console. log("Running the GraphQL API server "); });

/*const PORT = process.env.PORT || 4000

app.listen(PORT,'0.0.0.0', function() {
  console.log(`Server listening on port ${PORT}`)
})*/

//API to view all the data in the given table
app.get("/api/collection/:collection",async (req,res)=>{
  const client=await getClient();
  await client.connect();
  const database = client.db("sample");
 
  const collection = database.collection(req.params.collection);
  const cursor=await collection.find({});
  var data=[]
  await cursor.forEach(function(doc){
    data.push(doc);
  });
  //console.log(data)
  res.send(data)
})
//API TO VIEW ALL THE PRODUCT DETAILS FOR A GIVEN REGION 
//( PRODUCT DETAILS INCLUDE region_name,item_name,sku,pellet_size,packing_type,pellet P price,Mash P price)
app.get("/api/region/:region",async (req,res)=>{
  const client=await getClient();
  await client.connect();
  const database = client.db("sample");
 var region_id= req.params.region
 var ecommerce_data=await fetchdata({},"ecommerce-base",[])
 ecommerce_data= await ecommerce_data.filter((x)=>x.region_id.toString()==region_id.toString())
    //console.log(ecommerce_data)
  var output=[];
  for(let i=0;i<ecommerce_data.length;i++){
    var obj={};
    obj._id=ecommerce_data[i]._id;
    var region_meta=await fetchdata({},"Region",[])
   var region_meta = await region_meta.filter((x)=>x._id.toString()==ecommerce_data[i].region_id.toString())
    obj.region_name=region_meta[0].region_name
    var item_meta=await fetchdata({},"Item",[])
    item_meta= await item_meta.filter((x)=>x._id.toString()==ecommerce_data[i].item_id.toString())
    obj.item_name=item_meta[0].item_name
    var sku_meta=await fetchdata({},"SKU",[])
    sku_meta= await sku_meta.filter((x)=>x._id.toString()==ecommerce_data[i].sku_id.toString())
    obj.sku=sku_meta[0].sku
    var pellet_meta=await fetchdata({},"Pellet",[])
    pellet_meta= await pellet_meta.filter((x)=>x._id.toString()==ecommerce_data[i].pellet_id.toString())
    obj.pellet_size=pellet_meta[0].pellet_size
    var packing_meta=await fetchdata({},"Packing",[])
    pelcking_meta= await packing_meta.filter((x)=>x._id.toString()==ecommerce_data[i].packing_id.toString())
    obj.packing_type=packing_meta[0].packing_type
    obj["pellet P price"]=ecommerce_data[i]["pellet P price"]
    obj["mash P price"]=ecommerce_data[i]["mash P price"]

    output.push(obj)
  }

  res.send(output)
})

async function  getClientdriver() {
  const client=await getClient();
  await client.connect();
}
getClientdriver();
