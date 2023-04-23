package it.polito.wa2.server.tickets

import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.TicketService
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTO

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class TicketController(private val ticketService: TicketService) {

    @ExceptionHandler(NoSuchElementException::class)
    fun handleNoTicketFound(e: NoSuchElementException) : ResponseEntity<String> =
        ResponseEntity(e.message, HttpStatus.NOT_FOUND)

    @GetMapping("/API/tickets")
    fun getAll() : List<TicketDTO> {
        return ticketService.getAll()
    }

    @GetMapping("/API/tickets/{id}")
    fun getTicket(@PathVariable id: Long) : TicketDTO {
        return ticketService.getTicket(id)
    }
}