package it.polito.wa2.server.messages

class MessageExceptions {

    class MessageNotFoundException(message: String) : RuntimeException(message)

    class MessageAlreadyExistsException(message: String) : RuntimeException(message)

    class MessageEmailDoesntMatch(message: String) : RuntimeException(message)

}