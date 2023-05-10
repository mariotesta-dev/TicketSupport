package it.polito.wa2.server.messages

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class MessageErrorHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(MessageExceptions.MessageNotFoundException::class)
    fun handleMessageNotFound(e: MessageExceptions.MessageNotFoundException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)

    @ExceptionHandler(MessageExceptions.MessageAlreadyExistsException::class)
    fun handleMessageAlreadyExists(e: MessageExceptions.MessageAlreadyExistsException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.message!!)
}