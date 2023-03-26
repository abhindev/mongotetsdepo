import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
      maxlength: 60,
    },
    address: {
        type: 
            {
              Address: { type: String, required: true , maxlength: 200},
              City: { type: String, required: true },
              State : { type: String, required: true },
              pinCode: { type: Number, required: true },
            },
          
    },
    phone: {
      type: Number,
      required: true,
    },
    phone2: {
      type: Number,
    },
    item: {
      type: Object,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required:true
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);