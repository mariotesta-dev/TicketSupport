package it.polito.wa2.server.tickets

import it.polito.wa2.server.profiles.ProfileDTO
import it.polito.wa2.server.profiles.ProfileExceptions
import it.polito.wa2.server.profiles.toDTO
import org.springframework.stereotype.Service

@Service
class TicketServiceImpl(private val ticketRepository: TicketRepository) : TicketService {

    override fun getAll(): List<TicketDTO> {
        return ticketRepository.findAll().map{ it.toDTO() }
    }

    override fun getTicket(ticketId: Long): List<TicketDTO> {
        val response = ticketRepository.findAllByTicketId(ticketId)?.map{ it.toDTO() }
            ?: throw TicketExceptions.TicketNotFoundException("Ticket for ticket $ticketId not found")

        return response
    }

   /* override fun getTicketsByUserId(profileId: Long): List<Ticket> {
        return ticketRepository.findByCustomerProfileId(profileId)
    }*/

}