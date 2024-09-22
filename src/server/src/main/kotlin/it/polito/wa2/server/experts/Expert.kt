package it.polito.wa2.server.experts

import it.polito.wa2.server.tickets.CategoryType
import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.users.User
import jakarta.persistence.*

@Table(name="experts")
@Entity
class Expert: User() {

    @OneToMany(mappedBy = "assignedTo", cascade = [CascadeType.MERGE])
    var tickets: Set<Ticket> = emptySet()

    @Enumerated(EnumType.STRING)
    var expertise: CategoryType = CategoryType.INFORMATION

}
