package it.polito.wa2.server.customers

import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.TicketDTOWithoutCustomer
import it.polito.wa2.server.tickets.toDTOWithoutCustomer
import it.polito.wa2.server.warranties.WarrantyDTOWithoutCustomer
import it.polito.wa2.server.warranties.toDTOWithoutCustomer

data class CustomerDTO(
    val id: Long,
    val email: String,
    val name: String,
    val surname: String,
    val warranties: List<WarrantyDTOWithoutCustomer>?,
    val tickets: List<TicketDTOWithoutCustomer>
)

data class CustomerDTOWithoutWarrantiesAndTickets(
    val id: Long,
    val email: String,
    val name: String,
    val surname: String
)

fun Customer.toDTO() : CustomerDTO {
    return CustomerDTO(id, email, name, surname, warranties.map { it.toDTOWithoutCustomer() }, tickets.map { it.toDTOWithoutCustomer() })
}

fun Customer.toDTOWithoutWarrantiesAndTickets() : CustomerDTOWithoutWarrantiesAndTickets {
    return CustomerDTOWithoutWarrantiesAndTickets(id, email, name, surname)
}