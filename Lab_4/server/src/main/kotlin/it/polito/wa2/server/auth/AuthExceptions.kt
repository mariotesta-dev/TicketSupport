package it.polito.wa2.server.auth

class AuthExceptions {
    class InvalidLoginRequestException(message: String) : RuntimeException(message)
}