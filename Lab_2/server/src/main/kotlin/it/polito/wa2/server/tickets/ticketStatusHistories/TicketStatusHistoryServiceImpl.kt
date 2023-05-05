package it.polito.wa2.server.tickets.ticketStatusHistories

import it.polito.wa2.server.tickets.Ticket
import org.springframework.stereotype.Service
import kotlin.reflect.full.createInstance

@Service
class TicketStatusHistoryServiceImpl(private val ticketStatusHistoryRepository: TicketStatusHistoryRepository) : TicketStatusHistoryService {

    private fun setStatus(status: TicketStatus, ticket: Ticket) : TicketStatusHistoryDTO {
        val ticketHistoryRecord = TicketStatusHistory::class.createInstance()
        ticketHistoryRecord.ticket = ticket
        ticketHistoryRecord.status = status
        return ticketStatusHistoryRepository.save(ticketHistoryRecord).toDTO()
    }

    private fun moveToStatus(ticket: Ticket, last: TicketStatus, next: TicketStatus) : TicketStatusHistoryDTO {
        if (!isValidTransition(last, next)){
            throw TicketStatusHistoryExceptions.UncompatibleHistoryException("Can't go from $last to $next")
        }

        return setStatus(next, ticket)
    }

    override fun getHistory(ticketId: Long): List<TicketStatusHistoryDTO> {

        return ticketStatusHistoryRepository.findAllByTicketId(ticketId)?.map { it.toDTO() }
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("History for ticket $ticketId not found")
    }

    override fun ticketStatusOpen(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return moveToStatus(lastStatus.ticket, lastStatus.status, TicketStatus.OPEN)
    }

    override fun ticketStatusClose(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return moveToStatus(lastStatus.ticket, lastStatus.status, TicketStatus.CLOSED)
    }

    override fun ticketStatusInProgress(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return moveToStatus(lastStatus.ticket, lastStatus.status, TicketStatus.IN_PROGRESS)
    }

    override fun ticketStatusResolve(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return moveToStatus(lastStatus.ticket, lastStatus.status, TicketStatus.RESOLVED)
    }

    override fun ticketStatusReopen(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return moveToStatus(lastStatus.ticket, lastStatus.status, TicketStatus.REOPENED)
    }

}