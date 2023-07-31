package it.polito.wa2.server.experts

import it.polito.wa2.server.customers.CustomerDTO
import it.polito.wa2.server.tickets.CategoryType
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistory

import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTOWithoutTicket

interface ExpertService {
    fun getExpert(email: String) : ExpertDTO
    fun getExpertHistoriesForEvaluation(expertId: Long) : List<TicketStatusHistoryDTOWithoutTicket>
    fun createExpert(expert: Expert) : ExpertDTO
    fun getAllExpertsByExpertise(expertise: String) : List<ExpertDTO>

    fun getAllExperts() : List<ExpertDTO>
}