package it.polito.wa2.server.experts

import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistory

import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTOWithoutTicket

interface ExpertService {
    fun getExpertHistoriesForEvaluation(expertId: Long) : List<TicketStatusHistoryDTOWithoutTicket>
    fun createExpert(expert: Expert) : ExpertDTO
    fun getAllExperts() : List<ExpertDTO>
}