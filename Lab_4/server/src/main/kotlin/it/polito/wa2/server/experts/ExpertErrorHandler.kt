package it.polito.wa2.server.experts

import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryExceptions

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ExpertErrorHandler : ResponseEntityExceptionHandler() {
    @ExceptionHandler(ExpertExceptions.ExpertNotFoundException::class)
    fun handleNoTicketFound(e: ExpertExceptions.ExpertNotFoundException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)

}
