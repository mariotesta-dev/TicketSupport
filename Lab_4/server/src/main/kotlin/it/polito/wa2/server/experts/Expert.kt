package it.polito.wa2.server.experts

import it.polito.wa2.server.users.User
import jakarta.persistence.*

@Table(name="experts")
@Entity
class Expert: User()
