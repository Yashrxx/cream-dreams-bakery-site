import mongoose from 'mongoose';

const mongoURI = "mongodb+srv://yashrx:Kapil_jain01@cluster0.pnrc3oq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = () => {
  mongoose.connect(mongoURI)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('Connection error:', err);
    });
};

export default connectToMongo;