package it.polito.wa2.server.experts

import it.polito.wa2.server.auth.AuthData
import it.polito.wa2.server.auth.AuthService
import it.polito.wa2.server.tickets.CategoryType
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTOWithoutTicket
import it.polito.wa2.server.tickets.ticketStatusHistories.toDTO
import jakarta.annotation.security.RolesAllowed
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ExpertController(private val expertService: ExpertService, private val authService: AuthService){

    @GetMapping("/API/experts/get/{email}")
    fun getExpert(@PathVariable email: String) : ExpertDTO {
        return expertService.getExpert(email)
    }

    // this method can be accessed by user whose role is manager
    @GetMapping("/API/experts/{expertId}")
    fun getExpertHistoriesForEvaluation(@PathVariable expertId: Long) : List<TicketStatusHistoryDTOWithoutTicket> {
        return expertService.getExpertHistoriesForEvaluation(expertId)
    }

    // this method can be accessed by user whose role is manager
    @GetMapping("/API/experts/expertise/{expertise}")
    fun getAllExpertsByExpertise(@PathVariable expertise: String) : List<ExpertDTO> {
        return expertService.getAllExpertsByExpertise(expertise)
    }

    // this method can be accessed by user whose role is manager
    @PostMapping("/API/experts")
    fun createExpert(@RequestBody expertRegistration: AuthData.ExpertRegistration) : ResponseEntity<String> {
        return authService.createExpert(expertRegistration)
    }

    // this method can be accessed by user whose role is manager
    // Returns all the experts
    @GetMapping("/API/experts")
    fun getExperts() : List<ExpertDTO> {
        return expertService.getAllExperts()
    }
}