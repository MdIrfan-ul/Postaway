import app from "./index.js";

const port = 8000;

app.listen(port,(req,res)=>{
    console.log(`Server is listening at http://localhost:${port}`);
})