package it.polito.wa2.server.tickets

import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.messages.MessageDTO
import jakarta.annotation.security.RolesAllowed
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.annotation.AuthenticationPrincipal
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.web.bind.annotation.*

@RestController
class TicketController(private val ticketService: TicketService) {

    // This must be accessible only by the manager
    @GetMapping("/API/tickets")
    fun getAllTickets() : List<TicketDTO> {
        return ticketService.getAllTickets()
    }

    //TODO does this method make sense?
    // This must be accessible only by the manager
    @GetMapping("/API/tickets/{ticketId}")
    fun getTicketById(@PathVariable ticketId: Long) : TicketDTO {
        return ticketService.getTicketById(ticketId)
    }

    // This must be accessible by the customer and the expert associated to the ticket
    // and the customer must be the one that is authenticated
    @GetMapping("/API/tickets/{ticketId}/messages")
    fun getTicketMessages(@PathVariable ticketId: Long) : List<MessageDTO> {
        return ticketService.getTicketMessages(ticketId)
    }

    // This must be accessible by a customer
    @PostMapping("/API/tickets")
    fun createNewTicket(@RequestBody ticket: Ticket, @AuthenticationPrincipal jwt: Jwt) : TicketDTO {
        return ticketService.createNewTicket(ticket, jwt)
    }

    data class Assignment(
        val priority: String = "",
        val expert: Expert = Expert()
    )

    // This must be accessible only by the manager
    @PutMapping("/API/tickets/{ticketId}/expert")
    fun assignTicketToExpert(@PathVariable ticketId: Long, @RequestBody assignment: Assignment) : TicketDTO {
        return ticketService.assignTicket(ticketId, assignment)
    }
}
