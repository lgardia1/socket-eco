import mongoose from 'mongoose';
import  dotenv  from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DB_HOST).then(()=>{
    console.log('Se ha conectado a MongoDB')
});

export default mongoose;