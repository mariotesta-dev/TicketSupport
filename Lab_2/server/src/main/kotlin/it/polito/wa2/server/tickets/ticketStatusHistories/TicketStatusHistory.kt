package it.polito.wa2.server.tickets.ticketStatusHistories

import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table
import java.time.LocalDateTime

@Entity
@Table(name="ticket_status_histories")
class TicketStatusHistory {
    @Id
    var ticketId: Long = 0
    var status: String = ""
    var updatedAt: LocalDateTime = LocalDateTime.now()
}
