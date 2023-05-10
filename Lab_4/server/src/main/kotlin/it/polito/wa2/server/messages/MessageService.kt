package it.polito.wa2.server.messages

interface MessageService {
    fun createMessage(message: Message) : MessageDTO
}