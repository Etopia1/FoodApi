const mongoose = require(`mongoose`)
require(`dotenv`).config()
const URL = process.env.MONGODB_URL


mongoose.connect(URL).then(()=>{
    
    console.log(` MongoDB has been  successfully connected.`);
}).catch((error)=>{
    console.log(`Unable to establish connection to DB because ${error}`);
})