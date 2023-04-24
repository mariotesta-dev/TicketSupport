package it.polito.wa2.server.tickets

import it.polito.wa2.server.products.Product
import it.polito.wa2.server.profiles.Profile
import java.time.LocalDateTime
import jakarta.persistence.*

@Entity
@Table(name = "tickets")
data class Ticket(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var ticketId: Long = 0,

    @ManyToOne
    @JoinColumn(name = "product_id", referencedColumnName = "ean")
    var product: Product? = null,

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    var customer: Profile? = null,

    @ManyToOne
    @JoinColumn(name = "assigned_to", referencedColumnName = "id")
    var assignedTo: Profile? = null,

    var subject: String = "",

    var issue: String = "",

    var priority: String = "",

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now()
)