package it.polito.wa2.server.customers

import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.users.User
import it.polito.wa2.server.warranties.Warranty
import jakarta.persistence.CascadeType
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.OneToMany
import jakarta.persistence.Table

@Entity
@Table(name="customers")
class Customer : User() {

    @OneToMany(mappedBy = "customer", cascade = [CascadeType.MERGE])
    var warranties: Set<Warranty> = emptySet()

    @OneToMany(mappedBy = "customer", cascade = [CascadeType.MERGE])
    var tickets: Set<Ticket> = emptySet()
}

