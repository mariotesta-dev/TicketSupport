package it.polito.wa2.server.experts

import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTOWithoutTicket
import it.polito.wa2.server.tickets.ticketStatusHistories.toDTOWithoutTicket
import org.springframework.stereotype.Service

@Service
class ExpertServiceImpl(val expertRepository: ExpertRepository) : ExpertService {
    override fun getExpertHistoriesForEvaluation(expertId: Long): List<TicketStatusHistoryDTOWithoutTicket> {
        return expertRepository.getExpertHistoriesForEvaluation(expertId).map { it.toDTOWithoutTicket() }
    }
}