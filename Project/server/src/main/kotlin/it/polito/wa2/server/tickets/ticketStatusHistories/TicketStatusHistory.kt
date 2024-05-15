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
    var ticket: Ticket? = null,

    @Enumerated(EnumType.STRING)
    var status: TicketStatus = TicketStatus.OPEN,

    var updatedAt: LocalDateTime = LocalDateTime.now()
)


val statesGraph = mapOf(
    TicketStatus.OPEN to listOf(TicketStatus.CLOSED, TicketStatus.IN_PROGRESS, TicketStatus.RESOLVED),
    TicketStatus.CLOSED to listOf(TicketStatus.REOPENED),
    TicketStatus.RESOLVED to listOf(TicketStatus.REOPENED, TicketStatus.CLOSED),
    TicketStatus.IN_PROGRESS to listOf(TicketStatus.OPEN, TicketStatus.CLOSED, TicketStatus.RESOLVED),
    TicketStatus.REOPENED to listOf(TicketStatus.CLOSED, TicketStatus.RESOLVED, TicketStatus.IN_PROGRESS)
)

fun isValidTransition(start: TicketStatus, end: TicketStatus): Boolean {
    return statesGraph[start]?.contains(end) ?: false
}

enum class TicketStatus {
    OPEN,
    CLOSED,
    RESOLVED,
    IN_PROGRESS,
    REOPENED
}