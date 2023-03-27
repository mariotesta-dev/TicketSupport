package it.polito.wa2.server.profiles

class ProfileExceptions {

    class ProfileNotFoundException(message: String) : RuntimeException(message)

    class ProfileAlreadyExistsException(message: String) : RuntimeException(message)
}