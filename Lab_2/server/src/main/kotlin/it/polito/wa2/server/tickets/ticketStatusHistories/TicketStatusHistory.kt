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
    var status: String = "",

    var updatedAt: LocalDateTime = LocalDateTime.now()
)
