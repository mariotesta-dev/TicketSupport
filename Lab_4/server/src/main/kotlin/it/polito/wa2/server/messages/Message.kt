package it.polito.wa2.server.messages


import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.tickets.Ticket

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.ManyToOne
import org.springframework.data.annotation.CreatedDate
import java.time.LocalDateTime

@Entity
class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0

    @ManyToOne
    var ticket: Ticket? = null

    @ManyToOne
    var customer: Customer? = null

    @ManyToOne
    var expert: Expert? = null

    // String that specifies who sent the message, either "customer" or "expert"
    var sentBy: String = ""

    var text: String = ""

    @CreatedDate
    var sentAt: LocalDateTime = LocalDateTime.now()

}