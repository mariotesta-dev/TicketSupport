package it.polito.wa2.server.tickets

import it.polito.wa2.server.messages.MessageDTO

interface TicketService {
    fun getTicketById(id: Long) : TicketDTO
    fun createNewTicket(customer: Ticket) : TicketDTO
    fun assignTicket(ticketId: Long, assignment: TicketController.Assignment) : TicketDTO
    fun getTicketMessages(ticketId: Long) : List<MessageDTO>
}