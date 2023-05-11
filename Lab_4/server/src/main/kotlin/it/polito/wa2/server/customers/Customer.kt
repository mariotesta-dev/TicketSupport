package it.polito.wa2.server.customers

import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.users.User
import it.polito.wa2.server.warranties.Warranty
import jakarta.persistence.*

@Entity
@Table(name="customers")
class Customer : User() {
    @OneToMany(mappedBy = "customer", cascade = [CascadeType.MERGE])
    var warranties: Set<Warranty> = emptySet()

    @OneToMany(mappedBy = "customer", cascade = [CascadeType.MERGE])
    var tickets: Set<Ticket> = emptySet()
}

