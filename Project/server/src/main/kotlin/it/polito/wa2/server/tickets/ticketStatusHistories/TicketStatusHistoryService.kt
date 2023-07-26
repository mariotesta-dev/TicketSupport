package it.polito.wa2.server.tickets.ticketStatusHistories

interface TicketStatusHistoryService {
    fun getHistory(ticketId: Long) : List<TicketStatusHistoryDTOWithoutTicket>
    fun ticketStatusOpen(ticketId: Long): TicketStatusHistoryDTO
    fun ticketStatusClose(ticketId: Long): TicketStatusHistoryDTO
    fun ticketStatusInProgress(ticketId: Long): TicketStatusHistoryDTO
    fun ticketStatusResolve(ticketId: Long): TicketStatusHistoryDTO
    fun ticketStatusReopen(ticketId: Long): TicketStatusHistoryDTO
}