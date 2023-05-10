package it.polito.wa2.server.experts

import it.polito.wa2.server.users.User
import jakarta.persistence.*

@Table(name="experts")
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Entity
@SequenceGenerator(name = "user_seq", sequenceName = "user_sequence", allocationSize = 1)
class Expert: User()
