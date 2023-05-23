package it.polito.wa2.server.auth

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.tickets.CategoryType
import org.keycloak.representations.idm.UserRepresentation
import kotlin.reflect.full.createInstance

class AuthData {

    data class Credentials(
        val grant_type: String = "password",
        val client_id: String = "ticketing",
        val username: String,
        val password: String
    )

    data class CustomerRegistration(
        val username: String,
        val password: String,
        val email: String,
        val firstName: String,
        val lastName: String
    )

    data class ExpertRegistration(
        val username: String,
        val password: String,
        val email: String,
        val firstName: String,
        val lastName: String,
        val expertise: CategoryType
    )

    data class RefreshToken(
        val clientId: String = "ticketing",
        val refresh_token: String
    )


}