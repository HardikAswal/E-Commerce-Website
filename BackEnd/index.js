const express = require ('express');
const bodyParser = require("body-parser");
const mongoose = require ('mongoose');
const cors = require ('cors');
const multer = require ('multer');
const upload = multer({dest: 'uploads/'});
const Schema = mongoose.Schema;
const app = express();

mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true});

app.use(cors());
app.use(bodyParser.json());   
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('uploads'));

const ObjSchema = new Schema({
    date:Date,
    id:String,
    picture:{
        file:String,
        inputKey:String
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
        console.log(doc)
        res.json(doc);
    })
})

app.post('/admin',upload.single('picture'),(req,res)=>{

    console.log(req.files);
    console.log("Path is:",req.body.picture.file);
    let item = new Item();
    item.date=req.body.date;
    item.id=req.body.id;
    item.picture=req.body.picture;
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
    console.log(item);
})

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on post ${PORT}`));