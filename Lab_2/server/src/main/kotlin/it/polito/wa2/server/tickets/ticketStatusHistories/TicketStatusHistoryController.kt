package it.polito.wa2.server.tickets.ticketStatusHistories

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class TicketStatusHistoryController(private val ticketStatusHistoryService: TicketStatusHistoryService) {

    @ExceptionHandler(NoSuchElementException::class)
    fun handleNoHistoryFound(e: NoSuchElementException) : ResponseEntity<String> =
        ResponseEntity(e.message, HttpStatus.NOT_FOUND)

    @GetMapping("/API/history")
    fun getAll() : List<TicketStatusHistoryDTO> {
        return ticketStatusHistoryService.getAll()
    }

    @GetMapping("/API/history/{ticketId}")
    fun getAll(@PathVariable ticketId: Long) : List<TicketStatusHistoryDTO>? {
        return ticketStatusHistoryService.getHistory(ticketId)
    }
}