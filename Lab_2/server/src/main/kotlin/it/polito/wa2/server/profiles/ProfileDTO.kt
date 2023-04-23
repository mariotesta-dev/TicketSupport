package it.polito.wa2.server.profiles

data class ProfileDTO(
    val id: Long,
    val email: String,
    val name: String,
    val surname: String,
    val role: String
)

fun Profile.toDTO() : ProfileDTO {
    return ProfileDTO(id, email, name, surname, role)
}