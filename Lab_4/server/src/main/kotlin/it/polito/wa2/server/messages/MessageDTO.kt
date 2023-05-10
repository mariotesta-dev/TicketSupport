package it.polito.wa2.server.messages

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerDTOWithoutWarrantiesAndTickets
import it.polito.wa2.server.customers.toDTOWithoutWarrantiesAndTickets
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.tickets.TicketDTOWithoutCustomer
import it.polito.wa2.server.tickets.toDTOWithoutCustomer
import it.polito.wa2.server.users.User
import it.polito.wa2.server.warranties.WarrantyDTOWithoutCustomer
import it.polito.wa2.server.warranties.toDTOWithoutCustomer
import java.time.LocalDateTime

data class MessageDTO(
    val id: Long,
    val customer: CustomerDTOWithoutWarrantiesAndTickets?,
    val expert: Expert?,
    val sentBy: String,
    val text: String,
    val sentAt: LocalDateTime
)

fun Message.toDTO() : MessageDTO {
    return MessageDTO(id, customer?.toDTOWithoutWarrantiesAndTickets(), expert, sentBy, text, sentAt)
}