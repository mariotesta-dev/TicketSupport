package it.polito.wa2.server.profiles

import org.springframework.http.HttpStatus
import org.springframework.http.ProblemDetail
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler

@RestControllerAdvice
class ProfilesErrorHandler: ResponseEntityExceptionHandler() {

    @ExceptionHandler(ProfileExceptions.ProfileNotFoundException::class)
    fun handleProfileNotFound(e: ProfileExceptions.ProfileNotFoundException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.NOT_FOUND, e.message!!)

    @ExceptionHandler(ProfileExceptions.ProfileAlreadyExistsException::class)
    fun handleProfileAlreadyExists(e: ProfileExceptions.ProfileAlreadyExistsException) =
        ProblemDetail.forStatusAndDetail(HttpStatus.CONFLICT, e.message!!)
}