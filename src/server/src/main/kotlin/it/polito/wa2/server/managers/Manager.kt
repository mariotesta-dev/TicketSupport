package it.polito.wa2.server.managers

import it.polito.wa2.server.users.User
import it.polito.wa2.server.users.UserDTO
import jakarta.persistence.*

@Table(name="managers")
@Entity
class Manager : User()

fun Manager.toDTO() : UserDTO {
    return UserDTO(id, email, name, surname)
}