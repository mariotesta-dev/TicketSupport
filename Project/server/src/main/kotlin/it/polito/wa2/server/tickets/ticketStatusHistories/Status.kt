package it.polito.wa2.server.tickets.ticketStatusHistories

import java.time.LocalDateTime

data class Status(
    val status: TicketStatus?,
    val updatedAt: LocalDateTime?
)

fun TicketStatusHistory.toStatus() : Status {
    return Status(status = status, updatedAt = updatedAt)
}