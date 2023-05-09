package it.polito.wa2.server.managers

import jakarta.persistence.*

@Table(name="managers")
@Entity
class Manager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0
    var email: String = ""
    var name: String = ""
    var surname: String = ""

}
