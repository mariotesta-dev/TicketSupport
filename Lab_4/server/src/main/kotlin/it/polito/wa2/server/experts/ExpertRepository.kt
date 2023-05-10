package it.polito.wa2.server.experts

import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistory
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.stereotype.Repository

@Repository
interface ExpertRepository : JpaRepository<Expert, Long>{

    // TODO implement GROUP BY by ticket_id
    @Query(value = "SELECT h from TicketStatusHistory h WHERE h.ticket.assignedTo.id = :expertId")
    fun getExpertHistoriesForEvaluation(expertId: Long) : List<TicketStatusHistory>

    fun findExpertByEmail(email: String) : Expert?
}