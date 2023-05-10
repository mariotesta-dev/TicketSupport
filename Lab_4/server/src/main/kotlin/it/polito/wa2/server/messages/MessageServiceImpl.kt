package it.polito.wa2.server.messages

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.tickets.TicketRepository
import org.springframework.stereotype.Service

@Service
class MessageServiceImpl(private val messageRepository: MessageRepository, private val ticketRepository: TicketRepository): MessageService {

    override fun createMessage(message: Message): MessageDTO {
        val messageFound = messageRepository.findById(message.id).orElse(null)

        if (messageFound != null) {
            // calling .save() on an existing message will update it, and we don't want to update already sent messages
            throw MessageExceptions.MessageAlreadyExistsException("Cannot update already existing message ${message.id}")
        } else {
            return messageRepository.save(message).toDTO()
        }
    }
}