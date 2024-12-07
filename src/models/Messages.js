import mongoose from "../config/db.js";

const mensajeSchema = new mongoose.Schema(
  {
    content: {type: String, required: true},
    sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" , required: true},
    conversation_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversations",
      required: true
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Messages", mensajeSchema);

export default Message;
