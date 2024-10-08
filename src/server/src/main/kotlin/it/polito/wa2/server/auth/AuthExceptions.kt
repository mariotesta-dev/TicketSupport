package it.polito.wa2.server.auth

class AuthExceptions {
    class InvalidLoginRequestException(message: String) : RuntimeException(message)
    class InvalidLogoutRequestException(message: String) : RuntimeException(message)
    class UnableToSignUpException(message: String) : RuntimeException(message)
}