package it.polito.wa2.server.managers

import it.polito.wa2.server.customers.CustomerDTO
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistory

import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTOWithoutTicket
import it.polito.wa2.server.users.UserDTO

interface ManagerService {
    fun getManager(email: String) : UserDTO
}