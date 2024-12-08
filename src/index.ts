import { Client } from "pg";

const pgclient=new Client("postgresql://todo-app_owner:vNOjLG8zyRa6@ep-summer-grass-a5msza3r.us-east-2.aws.neon.tech/todo-app?sslmode=require")
import express from 'express'
const app=express();

app.use(express.json())

pgclient.connect();
app.post("/signUp",async(req,res)=>{
    const username=req.body.username;
    const email=req.body.email;
    const password=req.body.password;
  try {              //sql injuection so pass it like this
    const insertquery=`insert into users (username,email,password) values ($1,$2,$3);`
    const response=await pgclient.query(insertquery,[username,email,password])

    res.json({
        message:"signed up"

    })} catch(e){
        console.log(e)
        res.json({
            message:"something went wrong"
        })
    }
})

// async function main(){
// }

// main();

app.listen(9000,()=>{
    console.log("started")
})