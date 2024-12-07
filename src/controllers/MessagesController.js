import Message from "../Models/Messages.js";

export default class MessagesRepository {
  
  static async getAllMessagesFromConversation(conversationId) {
    try {
      const messages = await Message.find(
        { conversation_id: conversationId },
        { _id: 0, content: 1, conversation_id: 0 }
      ).sort({ createdAt: -1 });

      return messages;
    } catch (error) {
      console.error("Error al obtener los mensajes: ", error);
    }
  }

  static async sendMessage(data) {
    try {
      const { content } = data

      if(typeof content !== 'string' || content.length < 1) throw new Error('No hay contenido en el mensaje');

      await new Message(data).save();
    } catch (error) {
      console.error("Error al crear el mensaje: ", error);
    }
  }
}
