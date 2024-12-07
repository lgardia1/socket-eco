import mongoose from "../config/db.js";

const UsersSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        email_verified_at: { type: Date, default: null },
        password: {type: String, required:true},
        remember_token: { type: String, default: null},
        conversation_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Conversations', default: null },
    },
    {
        timestamps: true, 
    }
);

const User = mongoose.model('Users', UsersSchema);

export default User;
