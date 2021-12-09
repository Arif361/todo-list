const mysql=require("mysql");
const con=mysql.createConnection({
host:"localhost",
user:"root",
password:"root",
database:"menulist"
});
con.connect(function(error){
     if(error)throw error;
    console.log("connected")
});

module.exports = con;