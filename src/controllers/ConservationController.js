import Conversation from "../Models/Conversations.js";

export default class ConversaitonRepository {
  static async getConversationByUserId(idUser) {
    try {
      const conversations = await Conversation.find(
        { users: idUser },
        { _id: 1, users: 0 }
      ).populate("lastMessage")
      .sort({ "lastMessage.createdAt": -1 });

      if (conversations.length === 0) {
        throw new Error("No tienes conversaciones pendientes");
      }

      return conversations;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
