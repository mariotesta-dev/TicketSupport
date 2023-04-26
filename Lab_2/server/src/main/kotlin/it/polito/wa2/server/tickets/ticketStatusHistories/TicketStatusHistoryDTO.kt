package it.polito.wa2.server.tickets.ticketStatusHistories

import it.polito.wa2.server.tickets.Ticket
import java.time.LocalDateTime

data class TicketStatusHistoryDTO(
    val ticketId: Ticket?,
    val status: String,
    val updatedAt: LocalDateTime
)

fun TicketStatusHistory.toDTO() : TicketStatusHistoryDTO {
    return TicketStatusHistoryDTO(ticketId, status, updatedAt)
}