package it.polito.wa2.server.tickets

import it.polito.wa2.server.customers.CustomerDTOWithoutWarrantiesAndTickets
import it.polito.wa2.server.customers.toDTOWithoutWarrantiesAndTickets
import it.polito.wa2.server.experts.*
import it.polito.wa2.server.products.Product
import it.polito.wa2.server.products.ProductDTOWithoutWarranty
import it.polito.wa2.server.products.toDTOWithoutWarranty
import it.polito.wa2.server.tickets.ticketStatusHistories.Status
import java.time.LocalDateTime

data class TicketDTO(
    val id: Long,
    val product: ProductDTOWithoutWarranty?,
    val customer: CustomerDTOWithoutWarrantiesAndTickets?,
    val assignedTo: ExpertDTOWithoutTickets?,
    val category: CategoryType,
    val summary: String,
    val description: String,
    val priority: String,
    val createdAt: LocalDateTime?,
    val history: Status? = null
)

data class TicketDTOWithoutCustomer(
    val id: Long,
    val product: ProductDTOWithoutWarranty?,
    val assignedTo: ExpertDTOWithoutTickets?,
    val category: CategoryType,
    val summary: String,
    val description: String,
    val priority: String,
    val createdAt: LocalDateTime?,
    val history: Status? = null
)

data class TicketDTOWithoutExpert(
    val id: Long,
    val product: ProductDTOWithoutWarranty?,
    val customer: CustomerDTOWithoutWarrantiesAndTickets?,
    val category: CategoryType,
    val summary: String,
    val description: String,
    val priority: String,
    val createdAt: LocalDateTime?,
)

fun Ticket.toDTO() : TicketDTO {
    return TicketDTO(id, product.toDTOWithoutWarranty(), customer?.toDTOWithoutWarrantiesAndTickets(), assignedTo?.toDTOWithoutTickets(), category, summary, description, priority, createdAt)
}

fun Ticket.toDTOWithoutCustomer() : TicketDTOWithoutCustomer {
    return TicketDTOWithoutCustomer(id, product.toDTOWithoutWarranty(), assignedTo?.toDTOWithoutTickets(), category, summary, description, priority, createdAt)
}

fun Ticket.toDTO(history: Status?) : TicketDTO {
    return TicketDTO(id, product.toDTOWithoutWarranty(), customer?.toDTOWithoutWarrantiesAndTickets(), assignedTo?.toDTOWithoutTickets(), category, summary, description, priority, createdAt, history)
}

fun Ticket.toDTOWithoutCustomer(history: Status?) : TicketDTOWithoutCustomer {
    return TicketDTOWithoutCustomer(id, product.toDTOWithoutWarranty(), assignedTo?.toDTOWithoutTickets(), category, summary, description, priority, createdAt)
}

fun Ticket.toDTOWithoutExpert() : TicketDTOWithoutExpert {
    return TicketDTOWithoutExpert(id, product.toDTOWithoutWarranty(), customer?.toDTOWithoutWarrantiesAndTickets(), category, summary, description, priority, createdAt)
}