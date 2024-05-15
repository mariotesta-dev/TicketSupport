package it.polito.wa2.server.tickets.ticketStatusHistories

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class TicketStatusHistoryController(private val ticketStatusHistoryService: TicketStatusHistoryService) {


    @GetMapping("/API/history/{ticketId}")
    fun getAll(@PathVariable ticketId: Long) : List<TicketStatusHistoryDTOWithoutTicket>? {
        return ticketStatusHistoryService.getHistory(ticketId)
    }

    // This must be accessible only by the manager
    @PostMapping("/API/history/open/{ticketId}")
    fun ticketStatusOpen(@PathVariable ticketId: Long) : TicketStatusHistoryDTO {
        return ticketStatusHistoryService.ticketStatusOpen(ticketId)
    }

    // This must be accessible only by the expert and the manager
    @PostMapping("/API/history/close/{ticketId}")
    fun ticketStatusClose(@PathVariable ticketId: Long) : TicketStatusHistoryDTO {
        return ticketStatusHistoryService.ticketStatusClose(ticketId)
    }

    // This must be accessible only by the manager
    @PostMapping("/API/history/in_progress/{ticketId}")
    fun ticketStatusInProgress(@PathVariable ticketId: Long) : TicketStatusHistoryDTO {
        return ticketStatusHistoryService.ticketStatusInProgress(ticketId)
    }

    // This must be accessible only by the expert and the manager
    @PostMapping("/API/history/resolve/{ticketId}")
    fun ticketStatusResolve(@PathVariable ticketId: Long) : TicketStatusHistoryDTO {
        return ticketStatusHistoryService.ticketStatusResolve(ticketId)
    }

    // This must be accessible only by the expert and the manager
    @PostMapping("/API/history/reopen/{ticketId}")
    fun ticketStatusReopen(@PathVariable ticketId: Long) : TicketStatusHistoryDTO {
        return ticketStatusHistoryService.ticketStatusReopen(ticketId)
    }
}