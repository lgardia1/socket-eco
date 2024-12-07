import mongoose from "../config/db.js";

const ConversationSchema = new mongoose.Schema(
  {
    users: [
      { type: Schema.Types.ObjectId, ref: 'Users' } 
    ],
    lastMessage: { type: Schema.Types.ObjectId, ref: 'Message' },  
  }
);

const Conversation = mongoose.model('Conversations', ConversationSchema);


export default Conversation;