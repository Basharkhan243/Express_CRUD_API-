import express from 'express';
const app=express();
const port =8080;
app.use(express.json())

let teaData=[];
let nextId=1;


app.post("/teas",(req,res)=>{
    const {name,price}=req.body 
    const newTea={
        id:nextId++,
        name:name,
        price:price,


    }
    teaData.push(newTea);
    res.status(203).send(newTea);
})
app.get("/teas",(req,res)=>{
    res.status(200).send(teaData);
})
// Sending a partcular Tea
app.get("/teas/:id",(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not Found');
    }
    else{
        res.status(201).send(tea);
    }
})
// Updating
app.put("/teas/:id",(req,res)=>{
    const tea=teaData.find(t=>t.id===parseInt(req.params.id))
    if(!tea){
        return res.status(404).send('Tea not Found');
    }else{
       const {name,price}=req.body
       tea.name=name;
       tea.price=price;
       res.status(202).send(tea)

    }
})

// delete

app.delete("/teas/:id",(req,res)=>{
    teaData=teaData.filter(t=>t.id !==parseInt(req.params.id));
    res.status(204).send("Deleted")
})













app.listen(port,()=>{
    console.log(`Server is running at port: ${port}....`)
})

