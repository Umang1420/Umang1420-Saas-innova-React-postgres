import fs from 'fs';
import PromptSync from 'prompt-sync';
import express from 'express';
const app = express();
const prompt = PromptSync(); 
const port = prompt(`Enter the port number where you want to join:`);;

// const note = 

// fs.writeFileSync('note.txt',note)
// fs.appendFileSync('note.txt',note)
// let data =  fs.readFileSync('note.txt','utf-8')
// console.log(data)       



app.get('/',(req,res)=>{
    res.send("Connected")
});

app.post('/',(req,res)=>{
    res.send("Got a post request")
})

app.listen(port);   