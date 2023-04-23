package it.polito.wa2.server.profiles

import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.SequenceGenerator
import jakarta.persistence.Table

@Entity
@Table(name="profiles")
class Profile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @SequenceGenerator(name = "id", sequenceName = "profiles_id_seq", allocationSize = 1)
    var id: Long = 0
    var email: String = ""
    var name: String = ""
    var surname: String = ""
    var role: String = ""
}
