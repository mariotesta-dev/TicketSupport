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
    var ticketId: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", referencedColumnName = "ean")
    var product: Product? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", referencedColumnName = "profile_id")
    var customer: Profile? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "_to", referencedColumnName = "profile_id")
    var assigned_to: Profile? = null,

    @Column(name = "subject")
    var subject: String = "",

    @Column(name = "issue")
    var issue: String = "",

    @Column(name = "priority")
    var priority: String = "",

    @Column(name = "created_at")
    var createdAt: LocalDateTime = LocalDateTime.now()
)