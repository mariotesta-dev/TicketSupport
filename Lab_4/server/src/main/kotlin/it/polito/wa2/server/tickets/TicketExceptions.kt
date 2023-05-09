package it.polito.wa2.server.tickets

class TicketExceptions {

    class TicketsNotFoundException(message: String) : RuntimeException(message)

    class TicketInvalid(message: String) : RuntimeException(message)

}