const express = require('express')
const app = express()
const port = 5000
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.znbhd.mongodb.net/${process.env.DB_BASE}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
const cors=require("cors")
const bodyParser=require("body-parser")
app.use(bodyParser.json())
app.use(cors())
client.connect(err => {
  const collection = client.db(`${process.env.DB_BASE}`).collection('majonerCollection');
//   console.log("succsesfully connented too mongodb")
//   client.close();
app.post('/Post',(req,res)=>{
    const product=req.body
    // collection.insertMany(product)
    collection.insertOne(product)
    .then(result=>{
        console.log(result)
       res.send(result.insertedCount)
    })
    
})


app.get("/Read",(req,res)=>{
  collection.find({}).limit(12)
  .toArray((err,documents)=>{
    res.send(documents)
  })
})
// app.get('/Product/:Key',(req,res)=>{
//   collection.find({key:req.params.key})
//   .toArray((err,documents)=>{
//     res.send(documents[0])
//   })
// })
});



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
