package it.polito.wa2.server.tickets

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TicketRepository : JpaRepository<Ticket, Long> {

    fun findAllByTicketId(ticketId: Long): List<Ticket>?

    fun findAllByCustomerId(customerId: Long): List<Ticket>?
}