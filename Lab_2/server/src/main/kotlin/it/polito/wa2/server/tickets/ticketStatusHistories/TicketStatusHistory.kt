package it.polito.wa2.server.tickets.ticketStatusHistories

import it.polito.wa2.server.tickets.Ticket
import jakarta.persistence.*
import java.time.LocalDateTime

@Entity
@Table(name="ticket_status_histories")
data class TicketStatusHistory (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(nullable = false)
    var ticket: Ticket = Ticket(),
    var status: TicketStatus = TicketStatus.OPEN,

    var updatedAt: LocalDateTime = LocalDateTime.now()
)


val statesGraph = mapOf(
    TicketStatus.OPEN to listOf(TicketStatus.CLOSED, TicketStatus.INPROGRESS, TicketStatus.RESOLVED),
    TicketStatus.CLOSED to listOf(TicketStatus.REOPENED),
    TicketStatus.RESOLVED to listOf(TicketStatus.REOPENED, TicketStatus.CLOSED),
    TicketStatus.INPROGRESS to listOf(TicketStatus.OPEN, TicketStatus.CLOSED, TicketStatus.RESOLVED),
    TicketStatus.REOPENED to listOf(TicketStatus.CLOSED, TicketStatus.RESOLVED, TicketStatus.INPROGRESS)
)

fun isValidTransition(start: TicketStatus, end: TicketStatus): Boolean {
    return statesGraph[start]?.contains(end) ?: false
}

enum class TicketStatus {
    OPEN,
    CLOSED,
    RESOLVED,
    INPROGRESS,
    REOPENED
}