package it.polito.wa2.server.tickets.ticketStatusHistories

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface TicketStatusHistoryRepository : JpaRepository<TicketStatusHistory, Long> {

    fun findAllByTicketId(ticketId: Long): List<TicketStatusHistory>?

    @Query(
        value = "SELECT * FROM ticket_status_histories WHERE ticket_id = :ticketId ORDER BY updated_at DESC LIMIT 1",
        nativeQuery = true
    )
    fun findLastStatus(ticketId: Long): TicketStatusHistory
}