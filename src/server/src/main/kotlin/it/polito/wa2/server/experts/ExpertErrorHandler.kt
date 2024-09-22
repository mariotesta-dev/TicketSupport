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
    fun handleNoExpertFound(e: ExpertExceptions.ExpertNotFoundException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)

    @ExceptionHandler(ExpertExceptions.ExpertAlreadyExistsException::class)
    fun handleExpertAlreadyExists(e: ExpertExceptions.ExpertAlreadyExistsException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.message!!)

    @ExceptionHandler(ExpertExceptions.ExpertNotSuitableException::class)
    fun handleExpertNotSuitable(e: ExpertExceptions.ExpertNotSuitableException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.BAD_REQUEST, e.message!!)

    @ExceptionHandler(ExpertExceptions.ExpertiseNotFoundException::class)
    fun handleExpertiseNotFound(e: ExpertExceptions.ExpertiseNotFoundException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)
}
