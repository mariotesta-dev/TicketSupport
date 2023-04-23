package it.polito.wa2.server.tickets

class TicketExceptions {

    class TicketNotFoundException(message: String) : RuntimeException(message)

}