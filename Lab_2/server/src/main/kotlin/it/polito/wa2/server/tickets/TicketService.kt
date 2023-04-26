package it.polito.wa2.server.tickets

interface TicketService {
    fun getAll() : List<TicketDTO>

    fun createNewTicket(profile: Ticket)
    fun editTicket(ticketId: Long, ticket: Ticket)
    fun getAllTickets(email: String): List<TicketDTO>
}