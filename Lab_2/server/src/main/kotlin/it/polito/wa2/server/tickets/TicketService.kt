package it.polito.wa2.server.tickets

interface TicketService {
    fun getAll() : List<TicketDTO>
    //fun getTicket(ticketId: Long) : TicketDTO
}