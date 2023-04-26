package it.polito.wa2.server.tickets

import it.polito.wa2.server.products.ProductRepository
import it.polito.wa2.server.profiles.*
import it.polito.wa2.server.tickets.ticketStatusHistories.Status
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistory
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryDTO
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistoryRepository
import org.springframework.data.repository.findByIdOrNull
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.LocalTime

@Service
class TicketServiceImpl(private val ticketRepository: TicketRepository, private val profileRepository: ProfileRepository, private val productRepository: ProductRepository, private val ticketStatusHistoryRepository: TicketStatusHistoryRepository) : TicketService {

    override fun getAll(): List<TicketDTO> {
        return ticketRepository.findAll().map{ it.toDTO() }
    }

    override fun createNewTicket(ticket: Ticket) {
        try {
            val newTicket = ticketRepository.save(ticket)
            val ticketHistoryRecord = TicketStatusHistory()
            ticketHistoryRecord.ticketId = newTicket
            ticketHistoryRecord.status = "OPEN"
            ticketHistoryRecord.updatedAt = LocalDateTime.now()
            ticketStatusHistoryRepository.save(ticketHistoryRecord)

        }
        catch(err: Error) {
            throw err
        }
    }

    override fun editTicket(ticketId: Long, ticket: Ticket) {
        val oldTicket = ticketRepository.findByIdOrNull(ticketId)
        if (oldTicket != null) {
            if(oldTicket.assignedTo == null && ticket.assignedTo != null) {

                val newHistoryRecord = TicketStatusHistory()
                newHistoryRecord.ticketId = oldTicket
                newHistoryRecord.status = "IN PROGRESS"
                newHistoryRecord.updatedAt = LocalDateTime.now()
                ticketStatusHistoryRepository.save(newHistoryRecord)
            }
            ticketRepository.save(ticket)
        }
        else {
            //throw TicketExceptions.TicketNotFoundException("Ticket with id $ticketId does not exist")
        }
    }

    override fun getAllTickets(email: String): List<TicketDTO> {
        try {
            val profile = profileRepository.findProfileByEmail(email)!!
            return ticketRepository.findAllByCustomerId(profile.id)?.map {
                val history = ticketStatusHistoryRepository.findLastStatus(it.ticketId)
                println(history.status)
                val lastStatus = Status(history.status, history.updatedAt)
                it.toDTO(lastStatus)
            }!!
        }
        catch(err: Error){
            throw TicketExceptions.TicketsNotFoundException("No tickets found")
        }
    }

    /*override fun getTicket(ticketId: Long): List<TicketDTO> {
        val response = ticketRepository.findAllByTicketId(ticketId)?.map{ it.toDTO() }
            ?: throw TicketExceptions.TicketNotFoundException("Ticket for ticket $ticketId not found")

        return response
    }*/

   /* override fun getTicketsByUserId(profileId: Long): List<Ticket> {
        return ticketRepository.findByCustomerProfileId(profileId)
    }*/

}