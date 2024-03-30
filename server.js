import app from "./index.js";
import {connectUsingMongoose} from "./src/config/mongoose.db.js";

app.listen(process.env.PORT,(req,res)=>{
    console.log(`server is listening at localhost:${process.env.PORT}`);
    connectUsingMongoose();

})