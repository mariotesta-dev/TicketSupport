package it.polito.wa2.server.customers

class CustomerExceptions {

    class CustomerNotFoundException(message: String) : RuntimeException(message)

    class CustomerAlreadyExistsException(message: String) : RuntimeException(message)

    class CustomerEmailDoesntMatch(message: String) : RuntimeException(message)

    class CustomerKeyclockException(message: String) : RuntimeException(message)

}