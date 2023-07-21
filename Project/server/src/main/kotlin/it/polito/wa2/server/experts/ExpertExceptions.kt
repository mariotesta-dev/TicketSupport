package it.polito.wa2.server.experts

class ExpertExceptions {
    class ExpertNotFoundException(message: String) : RuntimeException(message)

    class ExpertAlreadyExistsException(message: String) : RuntimeException(message)

    class ExpertNotSuitableException(message: String) : RuntimeException(message)

}