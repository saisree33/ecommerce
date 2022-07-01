const {fetchdata,insertdata,updatedata}=require("../connection/mongo");
const moment=require("moment")
async function getAnyTableData(table){
    var tabledata=await fetchdata({},table,[]);
    var data=tabledata;
    
    console.log(data)
return data
}
module.exports={
    getAnyTableData
}