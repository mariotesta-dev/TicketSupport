package it.polito.wa2.server.tickets

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface TicketRepository : JpaRepository<Ticket, Long> {

    @Query(value = "SELECT t FROM Ticket t WHERE t.customer.email = :email")
    fun findAllByCustomerId(email: String): List<Ticket>?
}