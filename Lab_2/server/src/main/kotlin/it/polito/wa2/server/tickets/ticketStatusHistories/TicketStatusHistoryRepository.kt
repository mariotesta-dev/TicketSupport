package it.polito.wa2.server.tickets.ticketStatusHistories

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface TicketStatusHistoryRepository : JpaRepository<TicketStatusHistory, Long> {

    fun findAllByTicketId(ticketId: Long): List<TicketStatusHistory>?
}