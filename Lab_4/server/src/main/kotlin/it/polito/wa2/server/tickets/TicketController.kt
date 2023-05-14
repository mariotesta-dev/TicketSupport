package it.polito.wa2.server.tickets

import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.messages.MessageDTO
import jakarta.annotation.security.RolesAllowed
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class TicketController(private val ticketService: TicketService) {

    @GetMapping("/API/tickets/{ticketId}")
    fun getTicketById(@PathVariable ticketId: Long) : TicketDTO {
        return ticketService.getTicketById(ticketId)
    }

    @GetMapping("/API/tickets/{ticketId}/messages")
    fun getTicketMessages(@PathVariable ticketId: Long) : List<MessageDTO> {
        return ticketService.getTicketMessages(ticketId)
    }

    @PostMapping("/API/tickets")
    fun createNewTicket(@RequestBody ticket: Ticket) : TicketDTO {
        return ticketService.createNewTicket(ticket)
    }

    data class Assignment(
        val priority: String = "",
        val expert: Expert = Expert()
    )

    @PutMapping("/API/tickets/{ticketId}/expert")
    @RolesAllowed("manager")
    fun assignTicketToExpert(@PathVariable ticketId: Long, @RequestBody assignment: Assignment) : TicketDTO {
        return ticketService.assignTicket(ticketId, assignment)
    }
}
