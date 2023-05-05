package it.polito.wa2.server.tickets

interface TicketService {
    fun getTicketById(id: Long) : TicketDTO
    fun createNewTicket(customer: Ticket) : TicketDTO
    fun assignTicket(ticketId: Long, assignment: TicketController.Assignment) : TicketDTO
}