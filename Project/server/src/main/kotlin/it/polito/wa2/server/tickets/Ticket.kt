package it.polito.wa2.server.tickets

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.messages.Message
import it.polito.wa2.server.products.Product
import it.polito.wa2.server.tickets.ticketStatusHistories.Status
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatus
import it.polito.wa2.server.tickets.ticketStatusHistories.TicketStatusHistory
import java.time.LocalDateTime
import jakarta.persistence.*

@Entity
@Table(name = "tickets")
data class Ticket(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.REFRESH])
    @JoinColumn(nullable = false)
    var product: Product = Product(),

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.REFRESH])
    @JoinColumn(nullable = false)
    var customer: Customer? = Customer(),

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.REFRESH])
    @JoinColumn(name = "assigned_to", referencedColumnName = "id", nullable = true)
    var assignedTo: Expert? = null,

    @Enumerated(EnumType.STRING)
    var category: CategoryType = CategoryType.INFORMATION,

    var summary: String = "",

    var description: String = "",

    var priority: String = "",

    var createdAt: LocalDateTime = LocalDateTime.now(),

    @OneToMany(mappedBy = "ticket")
    var messages: List<Message> = listOf(),

    var status: TicketStatus? = null,
    var lastUpdatedAt: LocalDateTime? = null
)

enum class PriorityType {
    HIGH,
    MEDIUM,
    LOW
}

enum class CategoryType {
    INFORMATION,
    HARDWARE,
    MAINTENANCE,
    NETWORK,
    OTHER,
    SOFTWARE,
    PAYMENT_ISSUES,
    BUG_REPORTS,
}