package it.polito.wa2.server.tickets

import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryExceptions

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class TicketErrorHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(TicketExceptions.TicketsNotFoundException::class)
    fun handleNoTicketFound(e: TicketExceptions.TicketsNotFoundException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)

    @ExceptionHandler(TicketExceptions.TicketInvalid::class)
    fun handleInvalidTicket(e: TicketExceptions.TicketInvalid) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_ACCEPTABLE, e.message!!)

    @ExceptionHandler(TicketExceptions.TicketNotOwnedException::class)
    fun handleTicketNotOwned(e: TicketExceptions.TicketNotOwnedException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.FORBIDDEN, e.message!!)
}
