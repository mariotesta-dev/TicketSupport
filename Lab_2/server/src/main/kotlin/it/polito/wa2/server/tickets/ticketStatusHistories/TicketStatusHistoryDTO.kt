package it.polito.wa2.server.tickets.ticketStatusHistories

import java.time.LocalDateTime

data class TicketStatusHistoryDTO(
    val ticketId: Long,
    val status: String,
    val updatedAt: LocalDateTime
)

fun TicketStatusHistory.toDTO() : TicketStatusHistoryDTO {
    return TicketStatusHistoryDTO(ticketId, status, updatedAt)
}