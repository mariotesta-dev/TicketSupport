package it.polito.wa2.server.experts

data class ExpertDTO (
    val id: Long,
    val email: String,
    val name: String,
    val surname: String,
)

fun Expert.toDTO() : ExpertDTO {
    return ExpertDTO(id, email, name, surname)
}