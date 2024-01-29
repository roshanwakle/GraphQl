const mongoose= require("mongoose")
async function dbConnection(){
    try {
        await  mongoose.connect('mongodb://127.0.0.1:27017/test')
        console.log('====================================');
        console.log("DB connected ..");
        console.log('====================================');

    } catch (error) {
        throw new Error(error)
    }
}

module.exports=dbConnection