package it.polito.wa2.server.tickets

import it.polito.wa2.server.products.Product
import it.polito.wa2.server.profiles.Profile
import jakarta.persistence.Column
import jakarta.persistence.FetchType
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import java.time.LocalDateTime

data class TicketDTO(
    val id: Long,
    val product: Product?,
    val customer: Profile?,
    val assigned_to: Profile?,
    val subject: String?,
    val issue: String?,
    val priority: String?,
    val created_at: LocalDateTime?
)

fun Ticket.toDTO() : TicketDTO {
    return TicketDTO(id, product, customer, assigned_to, subject, issue, priority, created_at)
}