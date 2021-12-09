const express=require("express")
const app=express()
const bodyparser=require("body-parser")
const path =require("path")
const db =require("./conn")
const port=process.env.PORT||2000
const hbs = require("hbs")


app.use(express.json());

app.use(bodyparser.urlencoded({extended:true}));
const static_path=path.join(__dirname, "..", "public");
app.use(express.static(static_path))


app.set('view engine', 'hbs');
app.use(express.static("public"))
// console.log(__dirname);
// console.log(path.join(__dirname, 'todo', '..', 'public', 'views'));
app.set('views',  path.join(__dirname, 'todo', '..', 'public', 'views'));

app.delete("/",(req,res)=>{
  db.query("delete from menulist where name=\""+req.body.name+"\"");
    res.status(200).json({success:true, msg: "Delete successfully"})
  })


app.get("/",(req,res)=>{
 try{ 
  db.query("SELECT * FROM menulist", (err, rows, fields) => {
    res.render("index",{ result:rows });
  })
} catch(err){
  console.log(err);
  res.send(err);
}

})

app.post('/',(req,res)=>{
   try { 
    db.query("SELECT name FROM menulist WHERE name=?",req.body.name,async function(err, result) {
      if(result.length == 0){
        await db.query("INSERT INTO menulist(`name`) values(\""+req.body.name+"\")");
        res.status(200).json({status:200, success:true, msg:"Data Submitted"})
      }else {
        res.status(200).json({status:403,success:false, msg:"Name is already exists"});
      }
    })

  } catch(error){
    res.status(400).json({error});  
  } 
})


app.patch("/",(req,res)=>{
  db.query("UPDATE menulist set name=\""+req.body.name+"\"where name=\""+req.body.id+"\"");
  res.status(200).json({status:403,success:false, msg:"data submitted"});
})




app.use('/static', express.static(static_path) )

app.listen(port,()=>{
    console.log(`server is successful,${port}`)
})


