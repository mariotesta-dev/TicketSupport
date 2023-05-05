package it.polito.wa2.server.tickets

import it.polito.wa2.server.customers.CustomerExceptions
import it.polito.wa2.server.customers.CustomerRepository
import it.polito.wa2.server.experts.ExpertExceptions
import it.polito.wa2.server.experts.ExpertRepository
import it.polito.wa2.server.experts.ExpertService
import it.polito.wa2.server.experts.ExpertServiceImpl
import it.polito.wa2.server.products.ProductExceptions
import it.polito.wa2.server.products.ProductRepository
import it.polito.wa2.server.tickets.ticketStatusHistories.*
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import kotlin.reflect.full.createInstance

@Service
class TicketServiceImpl(
    private val ticketRepository: TicketRepository,
    private val ticketStatusHistoryRepository: TicketStatusHistoryRepository,
    private val expertRepository: ExpertRepository,
    private val customerRepository: CustomerRepository,
    private val productRepository: ProductRepository
) : TicketService {

    override fun getTicketById(ticketId: Long): TicketDTO {
        val ticket = ticketRepository.findById(ticketId).orElse(null)

        if (ticket != null) {
            val status : Status? = ticketStatusHistoryRepository.findLastStatus(ticketId)?.toStatus()
            return ticket.toDTO(status)
        }
        throw TicketExceptions.TicketsNotFoundException("Ticket with id $ticketId not found")
    }

    override fun createNewTicket(ticket: Ticket) : TicketDTO {

        customerRepository.findById(ticket.customer!!.id).orElse(null)
            ?: throw CustomerExceptions.CustomerNotFoundException("Customer with id ${ticket.customer?.id} not found")

        productRepository.findById(ticket.product.ean).orElse(null)
            ?: throw ProductExceptions.ProductNotFoundException("Product with ean ${ticket.product?.ean} not found")

        val newTicket = ticketRepository.save(ticket)

        val ticketHistoryRecord = TicketStatusHistory::class.createInstance()
        ticketHistoryRecord.ticket = newTicket
        ticketHistoryRecord.status = TicketStatus.OPEN
        ticketHistoryRecord.updatedAt = LocalDateTime.now()
        ticketStatusHistoryRepository.save(ticketHistoryRecord)

        return newTicket.toDTO(ticketHistoryRecord.toStatus())
    }

    override fun assignTicket(ticketId: Long, assignment: TicketController.Assignment): TicketDTO {
        val ticket = ticketRepository.findById(ticketId).orElse(null)

        expertRepository.findById(assignment.expert.id).orElse(null)
            ?: throw ExpertExceptions.ExpertNotFoundException("Expert with id ${assignment.expert.id} not found")

        if (ticket != null) {

            ticket.assignedTo = assignment.expert
            ticket.priority = assignment.priority
            val newTicket = ticketRepository.save(ticket)

            val history = TicketStatusHistory::class.createInstance()
            history.ticket = newTicket
            history.status = TicketStatus.IN_PROGRESS
            history.updatedAt = LocalDateTime.now()
            ticketStatusHistoryRepository.save(history)

            return newTicket.toDTO(history.toStatus())
        } else {
            throw TicketExceptions.TicketsNotFoundException("Ticket with id $ticketId not found")
        }
    }

}