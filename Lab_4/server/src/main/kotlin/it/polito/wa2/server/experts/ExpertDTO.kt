package it.polito.wa2.server.experts

import it.polito.wa2.server.tickets.TicketDTOWithoutExpert
import it.polito.wa2.server.tickets.toDTOWithoutExpert

data class ExpertDTO (
    val id: Long,
    val email: String,
    val name: String,
    val surname: String,
    val tickets: Set<TicketDTOWithoutExpert>
)

data class ExpertDTOWithoutTickets (
    val id: Long,
    val email: String,
    val name: String,
    val surname: String,
)

fun Expert.toDTO() : ExpertDTO {
    return ExpertDTO(id, email, name, surname, tickets.map { it.toDTOWithoutExpert() }.toSet())
}

fun Expert.toDTOWithoutTickets() : ExpertDTOWithoutTickets {
    return ExpertDTOWithoutTickets(id, email, name, surname)
}