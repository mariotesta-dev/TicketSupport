package it.polito.wa2.server.users

import it.polito.wa2.server.tickets.TicketDTOWithoutCustomer
import it.polito.wa2.server.tickets.toDTOWithoutCustomer
import it.polito.wa2.server.warranties.WarrantyDTOWithoutCustomer
import it.polito.wa2.server.warranties.toDTOWithoutCustomer

data class UserDTO(
    val id: Long,
    val email: String,
    val name: String,
    val surname: String
)