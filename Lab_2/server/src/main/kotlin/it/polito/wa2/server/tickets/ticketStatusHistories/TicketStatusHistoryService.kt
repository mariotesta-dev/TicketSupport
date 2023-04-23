package it.polito.wa2.server.tickets.ticketStatusHistories

interface TicketStatusHistoryService {
    fun getAll() : List<TicketStatusHistoryDTO>
    fun getHistory(ticketId: Long) : List<TicketStatusHistoryDTO>
}