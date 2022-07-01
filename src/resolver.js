

const {getAnyTableData}=require("./apis/readTablesData");


const resolver={
   
  getAnyTableData:async({table},req)=>{
    return getAnyTableData(table);
  }
    
};
module.exports=resolver;