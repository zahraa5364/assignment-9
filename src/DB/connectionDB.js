import mongoose from "mongoose"

const checkconnectionDB = async ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/sarahaAPP",{serverSelectionTimeoutMS:5000})
    .then (()=>{
        console.log("DB connected successfully.....")
    })
    .catch((error)=>{
        console.log(error,"DB connected failed.....")
    })
}

export default checkconnectionDB