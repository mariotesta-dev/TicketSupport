package it.polito.wa2.server.tickets

import it.polito.wa2.server.products.Product
import it.polito.wa2.server.profiles.Profile
import it.polito.wa2.server.tickets.ticketStatusHistories.Status
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistory
import jakarta.persistence.Column
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import java.time.LocalDateTime

data class TicketDTO(
    val ticketId: Long,
    val product: Product?,
    val customer: Profile?,
    val assignedTo: Profile?,
    val category: String,
    val summary: String,
    val description: String,
    val priority: String,
    val createdAt: LocalDateTime?,
    val history: Status? = null
)

fun Ticket.toDTO() : TicketDTO {
    return TicketDTO(ticketId, product, customer, assignedTo, category, summary, description, priority, createdAt)
}

fun Ticket.toDTO(history: Status) : TicketDTO {
    return TicketDTO(ticketId, product, customer, assignedTo, category, summary, description, priority, createdAt, history)
}