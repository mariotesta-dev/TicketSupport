package it.polito.wa2.server.tickets

import it.polito.wa2.server.products.Product
import it.polito.wa2.server.profiles.Profile
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
    val subject: String?,
    val issue: String?,
    val priority: String?,
    val createdAt: LocalDateTime?
)

fun Ticket.toDTO() : TicketDTO {
    return TicketDTO(ticketId, product, customer, assignedTo, subject, issue, priority, createdAt)
}