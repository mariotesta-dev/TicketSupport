package it.polito.wa2.server.managers

import it.polito.wa2.server.customers.CustomerExceptions
import it.polito.wa2.server.customers.toDTO
import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTOWithoutTicket
import it.polito.wa2.server.tickets.ticketStatusHistories.toDTOWithoutTicket
import it.polito.wa2.server.users.UserDTO
import org.springframework.stereotype.Service

@Service
class ManagerServiceImpl(private val managerRepository: ManagerRepository) : ManagerService {
    override fun getManager(email: String): UserDTO {
        val response = managerRepository.findManagerByEmail(email)
            ?: throw CustomerExceptions.CustomerNotFoundException("Manager with email $email not found")

        return response.toDTO()
    }
}