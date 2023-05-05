package it.polito.wa2.server.experts

import jakarta.persistence.*

@Table(name="experts")
@Entity
class Expert {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0
    var email: String = ""
    var name: String = ""
    var surname: String = ""

}
