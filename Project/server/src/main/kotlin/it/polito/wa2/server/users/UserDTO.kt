package it.polito.wa2.server.users

data class UserDTO (
    val id: Long,
    val email: String,
    val name: String,
    val surname: String,
)

fun User.toDTO() : UserDTO {
    return UserDTO(id, email, name, surname)
}