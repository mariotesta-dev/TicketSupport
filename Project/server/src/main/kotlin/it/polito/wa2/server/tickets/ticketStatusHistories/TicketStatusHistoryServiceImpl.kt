package it.polito.wa2.server.tickets.ticketStatusHistories

import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.tickets.TicketExceptions
import it.polito.wa2.server.tickets.TicketRepository
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
import org.springframework.stereotype.Service
import kotlin.reflect.full.createInstance

@Service
class TicketStatusHistoryServiceImpl(
    private val ticketStatusHistoryRepository: TicketStatusHistoryRepository,
    private val ticketRepository: TicketRepository
) : TicketStatusHistoryService {

    private fun setStatus(status: TicketStatus, ticket: Ticket) : TicketStatusHistoryDTO {
        val ticketHistoryRecord = TicketStatusHistory::class.createInstance()
        ticketHistoryRecord.ticket = ticket
        ticketHistoryRecord.status = status
        return ticketStatusHistoryRepository.save(ticketHistoryRecord).toDTO()
    }

    private fun moveToStatus(ticket: Ticket, last: TicketStatus, next: TicketStatus) : TicketStatusHistoryDTO {

        val jwt = SecurityContextHolder.getContext().authentication as JwtAuthenticationToken
        val u = jwt.principal as Jwt

        if(u.getClaim<String>("email") != ticket.assignedTo?.email) {
            throw TicketExceptions.TicketNotOwnedException("You are not authorized to change the status of this ticket")
        }

        if (!isValidTransition(last, next)){
            throw TicketStatusHistoryExceptions.UncompatibleHistoryException("Can't go from $last to $next")
        }

        return setStatus(next, ticket)
    }

    override fun getHistory(ticketId: Long): List<TicketStatusHistoryDTO> {



        ticketRepository.findById(ticketId).orElse(null)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Ticket with id $ticketId not found")

        return ticketStatusHistoryRepository.findAllByTicketId(ticketId)?.map { it.toDTO() }
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("History for ticket $ticketId not found")
    }

    override fun ticketStatusOpen(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return moveToStatus(lastStatus.ticket!!, lastStatus.status, TicketStatus.OPEN)
    }

    override fun ticketStatusClose(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return moveToStatus(lastStatus.ticket!!, lastStatus.status, TicketStatus.CLOSED)
    }

    override fun ticketStatusInProgress(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return moveToStatus(lastStatus.ticket!!, lastStatus.status, TicketStatus.IN_PROGRESS)
    }

    override fun ticketStatusResolve(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return moveToStatus(lastStatus.ticket!!, lastStatus.status, TicketStatus.RESOLVED)
    }

    override fun ticketStatusReopen(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return moveToStatus(lastStatus.ticket!!, lastStatus.status, TicketStatus.REOPENED)
    }

}