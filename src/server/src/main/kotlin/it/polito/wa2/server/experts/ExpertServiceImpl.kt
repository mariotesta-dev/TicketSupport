package it.polito.wa2.server.experts

import it.polito.wa2.server.customers.CustomerExceptions
import it.polito.wa2.server.customers.toDTO
import it.polito.wa2.server.tickets.CategoryType
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.*
import org.springframework.stereotype.Service

@Service
class ExpertServiceImpl(val expertRepository: ExpertRepository,  private val ticketStatusHistoryService: TicketStatusHistoryService) : ExpertService {
    override fun getExpert(email: String): ExpertDTO {
        val response = expertRepository.findExpertByEmail(email)
            ?: throw CustomerExceptions.CustomerNotFoundException("Expert with email $email not found")

        response.tickets.onEach {
            val status = ticketStatusHistoryService.getHistory(it.id).sortedByDescending {list -> list.updatedAt}[0]
            it.status = status.status
            it.lastUpdatedAt = status.updatedAt
        }

        return response.toDTO()
    }

    override fun getExpertHistoriesForEvaluation(expertId: Long): List<TicketStatusHistoryDTO> {

        expertRepository.findById(expertId).orElse(null)
            ?: throw ExpertExceptions.ExpertNotFoundException("Expert with id $expertId not found")

        return expertRepository.getExpertHistoriesForEvaluation(expertId).map { it.toDTO() }
    }

    override fun getAllExpertsByExpertise(expertise: String): List<ExpertDTO> {
        val expertiseParam = when(expertise) {
            "SOFTWARE" -> CategoryType.SOFTWARE
            "HARDWARE" -> CategoryType.HARDWARE
            "NETWORK" -> CategoryType.NETWORK
            "INFORMATION" -> CategoryType.INFORMATION
            "MAINTENANCE" -> CategoryType.MAINTENANCE
            "OTHER" -> CategoryType.OTHER
            "PAYMENT_ISSUES" -> CategoryType.PAYMENT_ISSUES
            "BUG_REPORTS" -> CategoryType.BUG_REPORTS
            else -> throw ExpertExceptions.ExpertiseNotFoundException("Expertise $expertise not found")
        }
        return expertRepository.getAllExpertsByExpertise(expertiseParam).map { it.toDTO() }
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

    override fun getAllExperts(): List<ExpertDTO> {
        return expertRepository.getAllExperts().map { it.toDTO() }
    }
}