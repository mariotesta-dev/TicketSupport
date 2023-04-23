package it.polito.wa2.server.tickets.ticketStatusHistories

import org.springframework.stereotype.Service

@Service
class TicketStatusHistoryServiceImpl(private val ticketStatusHistoryRepository: TicketStatusHistoryRepository) : TicketStatusHistoryService {
    override fun getAll(): List<TicketStatusHistoryDTO> {
        return ticketStatusHistoryRepository.findAll().map{ it.toDTO() }
    }

    override fun getHistory(ticketId: Long): List<TicketStatusHistoryDTO> {
        val response = ticketStatusHistoryRepository.findAllByTicketId(ticketId)?.map{ it.toDTO() }
            ?: throw TicketStatusHistoryExceptions.HistoryNotFoundException("History for ticket $ticketId not found")

        return response

    }

}