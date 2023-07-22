package it.polito.wa2.server.experts

import it.polito.wa2.server.customers.CustomerExceptions
import it.polito.wa2.server.customers.toDTO
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTOWithoutTicket
import it.polito.wa2.server.tickets.ticketStatusHistories.toDTOWithoutTicket
import org.springframework.stereotype.Service

@Service
class ExpertServiceImpl(val expertRepository: ExpertRepository) : ExpertService {
    override fun getExpert(email: String): ExpertDTO {
        val response = expertRepository.findExpertByEmail(email)
            ?: throw CustomerExceptions.CustomerNotFoundException("Expert with email $email not found")

        return response.toDTO()
    }

    override fun getExpertHistoriesForEvaluation(expertId: Long): List<TicketStatusHistoryDTOWithoutTicket> {

        expertRepository.findById(expertId).orElse(null)
            ?: throw ExpertExceptions.ExpertNotFoundException("Expert with id $expertId not found")

        return expertRepository.getExpertHistoriesForEvaluation(expertId).map { it.toDTOWithoutTicket() }
    }

    override fun getAllExperts(): List<ExpertDTO> {
        return expertRepository.findAll().map { it.toDTO() }
    }

    override fun createExpert(expert: Expert): ExpertDTO {

        val expertFound = expertRepository.findExpertByEmail(expert.email)

        if(expertFound != null)
            throw ExpertExceptions.ExpertAlreadyExistsException("Expert with email ${expert.email} already exists")
        else {
            expert.role = "expert" // Role is set server-side, not in the JSON!
            return expertRepository.save(expert).toDTO()
        }
    }
}