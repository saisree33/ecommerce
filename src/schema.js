var {buildSchema}=require("graphql");
//getcandidatefilters(input:candidatefiltersinput):[candidatefilters]


var schema=buildSchema(`
scalar date
scalar JSON

type Query{
   

   
    getAnyTableData(table:String):JSON
   
}

type tabledata{
   _id:ID,
   name:String
}

`);

module.exports=schema;
//union candidatefilters=CandidateProfile | jobapplicantsoutput