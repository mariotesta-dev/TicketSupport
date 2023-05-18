package it.polito.wa2.server.tickets

import it.polito.wa2.server.messages.MessageDTO
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.jwt.Jwt

interface TicketService {

    fun getAllTickets() : List<TicketDTO>
    fun getTicketById(id: Long) : TicketDTO
    fun createNewTicket(customer: Ticket, jwt: Jwt) : TicketDTO
    fun assignTicket(ticketId: Long, assignment: TicketController.Assignment) : TicketDTO
    fun getTicketMessages(ticketId: Long) : List<MessageDTO>

    fun updateTicketPriority(ticketId: Long, priority: String) : TicketDTO
}