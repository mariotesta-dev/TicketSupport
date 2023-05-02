package it.polito.wa2.server.tickets.ticketStatusHistories

import it.polito.wa2.server.tickets.Ticket
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import kotlin.reflect.full.createInstance

@Service
class TicketStatusHistoryServiceImpl(private val ticketStatusHistoryRepository: TicketStatusHistoryRepository) : TicketStatusHistoryService {

    private fun setStatus(status: String, ticket: Ticket) : TicketStatusHistoryDTO {
        val ticketHistoryRecord = TicketStatusHistory::class.createInstance()
        ticketHistoryRecord.ticket = ticket
        ticketHistoryRecord.status = status
        return ticketStatusHistoryRepository.save(ticketHistoryRecord).toDTO()
    }

    override fun getHistory(ticketId: Long): List<TicketStatusHistoryDTO> {

        return ticketStatusHistoryRepository.findAllByTicketId(ticketId)?.map { it.toDTO() }
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("History for ticket $ticketId not found")

    }

    override fun ticketStatusOpen(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return when(lastStatus.status){
            "IN PROGRESS" -> setStatus("OPEN", lastStatus.ticket)
            else -> throw TicketStatusHistoryExceptions.UncompatibleHistoryException("Can't go from ${lastStatus.status} to OPEN")
        }
    }

    override fun ticketStatusClose(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return when(lastStatus.status){
            "OPEN" -> setStatus("CLOSED", lastStatus.ticket)
            "IN PROGRESS" -> setStatus("CLOSED", lastStatus.ticket)
            "REOPENED" -> setStatus("CLOSED", lastStatus.ticket)
            "RESOLVED" -> setStatus("CLOSED", lastStatus.ticket)
            else -> throw TicketStatusHistoryExceptions.UncompatibleHistoryException("Can't go from ${lastStatus.status} to CLOSED")
        }
    }

    override fun ticketStatusInProgress(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return when(lastStatus.status){
            "OPEN" -> setStatus("IN PROGRESS", lastStatus.ticket)
            "REOPENED" -> setStatus("IN PROGRESS", lastStatus.ticket)
            else -> throw TicketStatusHistoryExceptions.UncompatibleHistoryException("Can't go from ${lastStatus.status} to IN PROGRESS")
        }
    }

    override fun ticketStatusResolve(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return when(lastStatus.status){
            "OPEN" -> setStatus("RESOLVED", lastStatus.ticket)
            "IN PROGRESS" -> setStatus("RESOLVED", lastStatus.ticket)
            "REOPENED" -> setStatus("RESOLVED", lastStatus.ticket)
            else -> throw TicketStatusHistoryExceptions.UncompatibleHistoryException("Can't go from ${lastStatus.status} to RESOLVED")
        }
    }

    override fun ticketStatusReopen(ticketId: Long): TicketStatusHistoryDTO {
        val lastStatus = ticketStatusHistoryRepository.findLastStatus(ticketId)
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("Cannot find status history for ticket with id $ticketId")

        return when(lastStatus.status){
            "RESOLVED" -> setStatus("REOPENED", lastStatus.ticket)
            "CLOSED" -> setStatus("REOPENED", lastStatus.ticket)
            else -> throw TicketStatusHistoryExceptions.UncompatibleHistoryException("Can't go from ${lastStatus.status} to REOPENED")
        }
    }

}