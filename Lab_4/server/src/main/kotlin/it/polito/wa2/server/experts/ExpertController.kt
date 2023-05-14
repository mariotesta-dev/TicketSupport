package it.polito.wa2.server.experts


import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTOWithoutTicket
import it.polito.wa2.server.tickets.ticketStatusHistories.toDTO
import jakarta.annotation.security.RolesAllowed
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ExpertController(private val expertService: ExpertService) {

    // this method can be accessed by user whose role is manager
    @GetMapping("/API/experts/{expertId}")
    fun getExpertHistoriesForEvaluation(@PathVariable expertId: Long) : List<TicketStatusHistoryDTOWithoutTicket> {
        return expertService.getExpertHistoriesForEvaluation(expertId)
    }

    // this method can be accessed by user whose role is manager
    @GetMapping("/API/experts")
    fun getAllExperts() : List<ExpertDTO> {
        return expertService.getAllExperts()
    }

    @PostMapping("/API/experts")
    fun createExpert(@RequestBody expert: Expert) : ExpertDTO {
        return expertService.createExpert(expert)
    }
}