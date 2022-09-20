const exp = require('constants')
const { urlencoded } = require('express')
const express=require('express')
var mysql=require('mysql')
const path=require('path')
const app=express()
const port=3500

var pool=mysql.createPool({
    connectionLimit:10,
    host:"localhost",
    user:"root",
    password:"",
    database:"2123szft_masodik"
})

app.use(express.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    pool.query('SELECT * FROM keszulekek', (err,results)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(results)
        }
    });
})

app.get('/insert',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname+'/insert.html'))
})

app.get('/update',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname+'/update.html'))
})

app.post('/update',(req,res)=>{
    var adat={
        "id":req.body.id,
        "gyarto":req.body.gyarto,
        "tipus":req.body.gyarto,
        "memoria":req.body.memoria,
        "tarhely":req.body.tarhely,
        "oprendszer":req.body.oprendszer,
        "processzor":req.body.processzor,
        "garancia":req.body.garancia,
        "ar":req.body.ar,
        "szin":req.body.szin
    }
    pool.query(`UPDATE keszulekek SET 
        gyarto='${adat.gyarto}', 
        tipus='${adat.tipus}', 
        memoria=${adat.memoria}, 
        tarhely='${adat.tarhely}', 
        oprendszer='${adat.oprendszer}', 
        processzor='${adat.processzor}', 
        garancia=${adat.garancia}, 
        ar=${adat.ar}, 
        szin='${adat.szin}' WHERE ID=${adat.id}`,(err,results)=>{

        if (err) {
            res.status(500).send("Hiba"+"\n"+err)
        }else{
            res.status(200).send("Az adatok sikeresen elmentve"+"\n"+results)
        }
    })
    
})

app.get('/delete/:ID',(req,res)=>{
    var PhoneID=req.params.ID
    pool.query(`DELETE FROM keszulekek WHERE ID=${PhoneID}`,(err,results)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(results)
        }
    })
})

app.post('/insert',(req,res)=>{
    var adat={
        "gyarto":req.body.gyarto,
        "tipus":req.body.gyarto,
        "memoria":req.body.memoria,
        "tarhely":req.body.tarhely,
        "oprendszer":req.body.oprendszer,
        "processzor":req.body.processzor,
        "garancia":req.body.garancia,
        "ar":req.body.ar,
        "szin":req.body.szin
    }
    pool.query(`INSERT INTO keszulekek VALUES(null,
        '${adat.gyarto}', 
        '${adat.tipus}', 
        '${adat.memoria}', 
        '${adat.tarhely}', 
        '${adat.oprendszer}', 
        '${adat.processzor}', 
        '${adat.garancia}', 
        '${adat.ar}', 
        '${adat.szin}' )`,(err,results)=>{

        if (err) {
            res.status(500).send("Hiba"+"\n"+err)
        }else{
            res.status(200).send("Az adatok sikeresen elmentve"+"\n"+results)
        }
    })
    
})



app.listen(port,()=>{
    console.log(`App is listening on port ${port}... `)
})