import mongoose from "mongoose";
function ConnectDB(){
mongoose.connect(process.env.MONGO_URL).then((res)=>{
    console.log('Mongo Db Start');
}).catch((error)=>{
     console.log('Mongo Db not Start',error);
})
}
export default ConnectDB;