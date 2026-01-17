import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  title: {
    type: String
},

  location: {
    type:String
},

  destination: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  price:{ 
    type:Number
},
  duration: {
    type:String,
  },
  
  rating: {
    type: Number,
    default: 0
  },
  category: {
    type: String,
      enum: [
      "Relaxation",
      "Cultural",
      "Adventure",
      "Luxury",
      "Family",
      "Transport"   
    ],
    required: true
  },
  images:{
    type: [String],
},
  availableSeats:{
    type:Number,
},
  createdAt: {
     type: Date, default: Date.now 
    }
});
const Package = mongoose.model('Package', PackageSchema);
export default Package;
