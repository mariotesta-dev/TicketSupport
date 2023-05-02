package it.polito.wa2.server.tickets

import it.polito.wa2.server.products.Product
import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerDTOWithoutWarrantiesAndTickets
import it.polito.wa2.server.customers.toDTOWithoutWarrantiesAndTickets
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.tickets.ticketStatusHistories.Status
import java.time.LocalDateTime

data class TicketDTO(
    val id: Long,
    val product: Product?,
    val customer: CustomerDTOWithoutWarrantiesAndTickets?,
    val assignedTo: Expert?,
    val category: String,
    val summary: String,
    val description: String,
    val priority: String,
    val createdAt: LocalDateTime?,
    val history: Status? = null
)

data class TicketDTOWithoutCustomer(
    val id: Long,
    val product: Product?,
    val assignedTo: Expert?,
    val category: String,
    val summary: String,
    val description: String,
    val priority: String,
    val createdAt: LocalDateTime?,
    val history: Status? = null
)

fun Ticket.toDTO() : TicketDTO {
    return TicketDTO(id, product, customer?.toDTOWithoutWarrantiesAndTickets(), assignedTo, category, summary, description, priority, createdAt)
}

fun Ticket.toDTOWithoutCustomer() : TicketDTOWithoutCustomer {
    return TicketDTOWithoutCustomer(id, product, assignedTo, category, summary, description, priority, createdAt)
}

fun Ticket.toDTO(history: Status?) : TicketDTO {
    return TicketDTO(id, product, customer?.toDTOWithoutWarrantiesAndTickets(), assignedTo, category, summary, description, priority, createdAt, history)
}

fun Ticket.toDTOWithoutCustomer(history: Status?) : TicketDTOWithoutCustomer {
    return TicketDTOWithoutCustomer(id, product, assignedTo, category, summary, description, priority, createdAt)
}