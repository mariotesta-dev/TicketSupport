package it.polito.wa2.server.tickets.ticketStatusHistories

class TicketStatusHistoryExceptions {

    class HistoryNotFoundException(message: String) : RuntimeException(message)

}