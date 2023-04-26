package it.polito.wa2.server.tickets

import it.polito.wa2.server.products.Product
import it.polito.wa2.server.profiles.Profile
import java.time.LocalDateTime
import jakarta.persistence.*
import java.sql.Timestamp

@Entity
@Table(name = "tickets")
data class Ticket(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id")
    var ticketId: Long = 0,

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.MERGE])
    @JoinColumn(name = "product_id", referencedColumnName = "ean")
    var product: Product? = null,

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.MERGE])
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    var customer: Profile? = null,

    @ManyToOne(fetch = FetchType.LAZY, cascade = [CascadeType.MERGE])
    @JoinColumn(name = "assigned_to", referencedColumnName = "id")
    var assignedTo: Profile? = null,

    var category: String = "",

    var summary: String = "",

    val description: String = "",

    var priority: String = "",

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now()
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