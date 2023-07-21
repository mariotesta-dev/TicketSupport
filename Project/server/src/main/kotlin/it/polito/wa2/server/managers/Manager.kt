package it.polito.wa2.server.managers

import it.polito.wa2.server.users.User
import jakarta.persistence.*

@Table(name="managers")
@Entity
class Manager : User()
