package it.polito.wa2.server.tickets.ticketStatusHistories

import java.time.LocalDateTime

data class Status(
    val status: String,
    val updatedAt: LocalDateTime
)