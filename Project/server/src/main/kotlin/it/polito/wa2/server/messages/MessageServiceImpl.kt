package it.polito.wa2.server.messages

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerExceptions
import it.polito.wa2.server.customers.CustomerRepository
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.experts.ExpertExceptions
import it.polito.wa2.server.experts.ExpertRepository
import it.polito.wa2.server.tickets.TicketExceptions
import it.polito.wa2.server.tickets.TicketRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.stereotype.Service
import org.springframework.security.oauth2.jwt.Jwt

@Service
class MessageServiceImpl(private val messageRepository: MessageRepository, private val ticketRepository: TicketRepository,
                         private val customerRepository: CustomerRepository, private val expertRepository: ExpertRepository
): MessageService {

    override fun createMessage(message: Message): MessageDTO {

        val jwt = SecurityContextHolder.getContext().authentication as JwtAuthenticationToken
        val u = jwt.principal as Jwt

        val ticket = ticketRepository.findById(message.ticket!!.id).orElse(null)
        if (ticket == null) {
            throw TicketExceptions.TicketsNotFoundException("Ticket ${message.ticket!!.id} not found")
        }
        else {

            message.expert = ticket.assignedTo
            message.customer = ticket.customer

            when(message.sentBy) {
                "customer" -> {
                    if (message.customer!!.email != u.getClaim<String>("email")) {
                        throw MessageExceptions.MessageEmailDoesntMatch("Customer ${u.getClaim<String>("email")} is not authorized to send messages for ticket ${message.ticket!!.id}")
                    }
                }
                "expert" -> {
                    if (message.expert!!.email != u.getClaim<String>("email")) {
                        throw MessageExceptions.MessageEmailDoesntMatch("Expert ${u.getClaim<String>("email")} is not authorized to send messages for ticket ${message.ticket!!.id}")
                    }
                }
            }


            val messageFound = messageRepository.findById(message.id).orElse(null)

            if (messageFound != null) {
                // calling .save() on an existing message will update it, and we don't want to update already sent messages
                throw MessageExceptions.MessageAlreadyExistsException("Cannot update already existing message ${message.id}")
            } else {
                return messageRepository.save(message).toDTO()
            }
        }
    }
}