const express = require ('express');
const app = express();
const bodyParser = require("body-parser");
const mongoose = require ('mongoose');
const cors = require ('cors');
const multer = require ('multer');
const Schema = mongoose.Schema;
let emptyFilePath;

mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ extended: false }));

const ObjSchema = new Schema({
    date:Date,
    id:String,
    picture:{
        file:Object
    },
    name:String,
    price:Number,
    description:String,
    qtyS:Number,
    qtyM:Number,
    qtyL:Number,
    qtyXL:Number,
    style:String,
    neck:String,
    sleeve:String,
    men:Boolean,
    women:Boolean,
    kids:Boolean
});

const Item = mongoose.model('Item', ObjSchema);

app.get('/admin',(req,res)=>{
    Item.find({}).then((doc)=>{
        console.log(doc);
        res.json(doc);
    })
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '../Front-End/public/images')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

app.post('/upload',upload,(req, res)=> {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      console.log("File:"+req.file);
      emptyFilePath = req.file;
      return res.status(200).send(req.file)
    })
});

app.post('/admin',(req,res)=>{
    console.log("Body:",req.body);
    console.log("Path: "+emptyFilePath);
    let item = new Item();
    item.date=req.body.date;
    item.id=req.body.id;
    item.picture.file=emptyFilePath;
    item.name=req.body.name;
    item.description=req.body.description;
    item.price=req.body.price;
    item.qtyS=req.body.qtyS;
    item.qtyM=req.body.qtyM;
    item.qtyL=req.body.qtyL;
    item.qtyXL=req.body.qtyXL;
    item.style=req.body.style;
    item.neck=req.body.neck;
    item.sleeve=req.body.sleeve;
    item.men=req.body.men;
    item.women=req.body.women;
    item.kids=req.body.kids;
    item.save();
    res.json(item);
    console.log("Item:",item);
})

//Remove Product
app.delete("/admin/:id",(req,res)=>{
    console.log("This is id:"+req.params.id);
    Item.findOneAndDelete({_id:req.params.id}).then((doc)=>{
        console.log(doc)
        res.json(doc)
    })
})

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on post ${PORT}`));