package it.polito.wa2.server.tickets.ticketStatusHistories

import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.tickets.TicketDTOWithoutCustomer
import it.polito.wa2.server.tickets.toDTOWithoutCustomer
import java.time.LocalDateTime

data class TicketStatusHistoryDTO(
    val ticket: TicketDTOWithoutCustomer,
    val status: TicketStatus,
    val updatedAt: LocalDateTime
)

data class TicketStatusHistoryDTOWithoutTicket(
    val ticket: Long,
    val status: TicketStatus,
    val updatedAt: LocalDateTime
)

fun TicketStatusHistory.toDTO() : TicketStatusHistoryDTO {
    return TicketStatusHistoryDTO(ticket.toDTOWithoutCustomer(), status, updatedAt)
}

fun TicketStatusHistory.toDTOWithoutTicket() : TicketStatusHistoryDTOWithoutTicket {
    return TicketStatusHistoryDTOWithoutTicket(ticket.id, status, updatedAt)
}