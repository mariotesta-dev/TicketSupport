package it.polito.wa2.server.tickets

import it.polito.wa2.server.tickets.ticketStatusHistories.*
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class TicketServiceImpl(private val ticketRepository: TicketRepository, private val ticketStatusHistoryRepository: TicketStatusHistoryRepository) : TicketService {

    override fun getTicketById(ticketId: Long): TicketDTO {
        val ticket = ticketRepository.findById(ticketId).orElse(null)

        println(ticket)

        if (ticket != null) {
            val status : Status? = ticketStatusHistoryRepository.findLastStatus(ticketId)?.toStatus()
            return ticket.toDTO(status)
        }
        throw TicketExceptions.TicketsNotFoundException("Ticket with id $ticketId not found")
    }

    override fun createNewTicket(ticket: Ticket) : TicketDTO {
        try {
            val newTicket = ticketRepository.save(ticket)
            val ticketHistoryRecord = TicketStatusHistory()
            ticketHistoryRecord.ticket = newTicket
            ticketHistoryRecord.status = TicketStatus.OPEN
            ticketHistoryRecord.updatedAt = LocalDateTime.now()
            ticketStatusHistoryRepository.save(ticketHistoryRecord)

            return newTicket.toDTO(ticketHistoryRecord.toStatus())
        }
        catch(err: Error) {
            throw err
        }
    }

    override fun assignTicket(ticketId: Long, assignment: TicketController.Assignment): TicketDTO {
        val ticket = ticketRepository.findById(ticketId).orElse(null)
        if (ticket != null) {
            ticket.assignedTo = assignment.expert
            ticket.priority = assignment.priority

            val newTicket = ticketRepository.save(ticket)

            val history = TicketStatusHistory()
            history.ticket = newTicket
            history.status = TicketStatus.INPROGRESS
            history.updatedAt = LocalDateTime.now()
            ticketStatusHistoryRepository.save(history)

            return newTicket.toDTO(history.toStatus())
        } else {
            throw TicketExceptions.TicketsNotFoundException("Ticket with id $ticketId not found")
        }
    }

}