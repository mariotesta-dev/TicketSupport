package it.polito.wa2.server.managers

import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ManagerRepository : JpaRepository<Manager, Long>{
    fun findManagerByEmail(email: String) : Manager?
}