package it.polito.wa2.server.tickets.ticketStatusHistories

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class TicketStatusHistoryErrorHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(TicketStatusHistoryExceptions.HistoryNotFoundException::class)
    fun handleNoHistoryFound(e: TicketStatusHistoryExceptions.HistoryNotFoundException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)
    @ExceptionHandler(TicketStatusHistoryExceptions.UncompatibleHistoryException::class)
    fun handleNoHistoryFound(e: TicketStatusHistoryExceptions.UncompatibleHistoryException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)
}
