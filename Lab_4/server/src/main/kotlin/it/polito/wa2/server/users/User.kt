package it.polito.wa2.server.users

import it.polito.wa2.server.tickets.Ticket
import it.polito.wa2.server.warranties.Warranty
import jakarta.persistence.*
import java.io.Serializable

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
abstract class User {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    var id: Long = 0
    @Column(nullable = false)
    var email: String = ""
    @Column(nullable = false)
    var name: String = ""
    @Column(nullable = false)
    var surname: String = ""
}

