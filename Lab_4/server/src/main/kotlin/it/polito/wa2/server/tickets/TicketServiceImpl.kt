package it.polito.wa2.server.tickets

import it.polito.wa2.server.config.JwtUtils
import it.polito.wa2.server.customers.CustomerExceptions
import it.polito.wa2.server.customers.CustomerRepository
import it.polito.wa2.server.experts.ExpertExceptions
import it.polito.wa2.server.experts.ExpertRepository
import it.polito.wa2.server.experts.ExpertService
import it.polito.wa2.server.experts.ExpertServiceImpl
import it.polito.wa2.server.messages.MessageDTO
import it.polito.wa2.server.messages.toDTO
import it.polito.wa2.server.products.ProductExceptions
import it.polito.wa2.server.products.ProductRepository
import it.polito.wa2.server.tickets.ticketStatusHistories.*
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken
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

    override fun getAllTickets(): List<TicketDTO> {
        return ticketRepository.findAll().map { ticket ->
            val status : Status? = ticketStatusHistoryRepository.findLastStatus(ticket.id!!)?.toStatus()
            ticket.toDTO(status)
        }
    }

    override fun getTicketById(ticketId: Long): TicketDTO {
        val ticket = ticketRepository.findById(ticketId).orElse(null)

        if (ticket != null) {
            val status : Status? = ticketStatusHistoryRepository.findLastStatus(ticketId)?.toStatus()
            return ticket.toDTO(status)
        }
        throw TicketExceptions.TicketsNotFoundException("Ticket with id $ticketId not found")
    }

    override fun createNewTicket(ticket: Ticket, jwt: Jwt) : TicketDTO {

        val customerEmail = JwtUtils.getEmail(jwt)!!;
        val customer = customerRepository.findCustomerByEmail(customerEmail)

        productRepository.findById(ticket.product.ean).orElse(null)
            ?: throw ProductExceptions.ProductNotFoundException("Product with ean ${ticket.product?.ean} not found")

        ticket.customer = customer;
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

        val expert = expertRepository.findById(assignment.expert.id).orElse(null)
            ?: throw ExpertExceptions.ExpertNotFoundException("Expert with id ${assignment.expert.id} not found")

        if(expert.expertise != ticket.category) {
            throw ExpertExceptions.ExpertNotSuitableException("Expert with id ${assignment.expert.id} not suitable for category ${ticket.category}")
        }

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

    override fun getTicketMessages(ticketId: Long): List<MessageDTO> {

        val jwt = SecurityContextHolder.getContext().authentication as JwtAuthenticationToken
        val u = jwt.principal as Jwt

        val ticket = ticketRepository.findById(ticketId).orElse(null)

        if (ticket != null) {

            if(u.getClaim<String>("user_name") != ticket.customer?.email && u.getClaim<String>("user_name") != ticket.assignedTo?.email)
                throw TicketExceptions.TicketNotOwnedException("Ticket with id $ticketId not owned by user ${u.getClaim<String>("email")}")

            return ticket.messages.map { it.toDTO() }

        } else {
            throw TicketExceptions.TicketsNotFoundException("Ticket with id $ticketId not found")
        }
    }

    override fun updateTicketPriority(ticketId: Long, priority: String): TicketDTO {
        val ticket = ticketRepository.findById(ticketId).orElse(null)

        if (ticket != null) {
            ticket.priority = priority
            val newTicket = ticketRepository.save(ticket)
            return newTicket.toDTO()
        } else {
            throw TicketExceptions.TicketsNotFoundException("Ticket with id $ticketId not found")
        }
    }

}