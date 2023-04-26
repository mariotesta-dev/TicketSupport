package it.polito.wa2.server.tickets

import it.polito.wa2.server.profiles.Profile
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.TicketService
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTO

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class TicketController(private val ticketService: TicketService) {

    @ExceptionHandler(NoSuchElementException::class)
    fun handleNoTicketFound(e: NoSuchElementException) : ResponseEntity<String> =
        ResponseEntity(e.message, HttpStatus.NOT_FOUND)

    @GetMapping("/API/tickets")
    fun getAll() : List<TicketDTO> {
        return ticketService.getAll()
    }

    @GetMapping("/API/tickets/{email}")
    fun getAllTickets(@PathVariable email: String) =
        ticketService.getAllTickets(email)

    @PostMapping("/API/tickets")
    fun createNewTicket(@RequestBody ticket: Ticket) {
        ticketService.createNewTicket(ticket)
    }

    @PutMapping("/API/tickets/{ticketId}")
    fun editTicket(@PathVariable ticketId: Long, @RequestBody ticket: Ticket) =
        ticketService.editTicket(ticketId, ticket)
}