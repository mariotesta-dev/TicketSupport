package it.polito.wa2.server.auth

import it.polito.wa2.server.customers.Customer
import it.polito.wa2.server.customers.CustomerService
import it.polito.wa2.server.experts.Expert
import it.polito.wa2.server.experts.ExpertService
import org.keycloak.admin.client.CreatedResponseUtil
import org.keycloak.admin.client.KeycloakBuilder
import org.keycloak.representations.idm.CredentialRepresentation
import org.keycloak.representations.idm.UserRepresentation
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.client.RestTemplate
import kotlin.reflect.full.createInstance

@Service
class AuthServiceImpl(val expertService: ExpertService, val customerService: CustomerService): AuthService {

    val restTemplate = RestTemplate()

    override fun login(credentials: AuthData.Credentials): ResponseEntity<String> {
        val headers = HttpHeaders().apply {
            contentType = MediaType.APPLICATION_FORM_URLENCODED
        }

        val content : MultiValueMap<String, String> = LinkedMultiValueMap()
        content.add("grant_type", credentials.grant_type)
        content.add("client_id", credentials.client_id)
        content.add("username", credentials.username)
        content.add("password", credentials.password)

        val request = HttpEntity<MultiValueMap<String, String>>(content, headers)

        return try {
            restTemplate.postForEntity(
                "http://localhost:8080/realms/ticketing/protocol/openid-connect/token",
                request,
                String::class.java)
        }catch (e: Exception){
            throw AuthExceptions.InvalidLoginRequestException("Invalid username and/or password")
        }
    }

    override fun logout(refreshToken: AuthData.RefreshToken): ResponseEntity<String> {
        val content : MultiValueMap<String, String> = LinkedMultiValueMap()
        content.add("client_id", refreshToken.clientId)
        content.add("refresh_token", refreshToken.refresh_token)

        val request : HttpEntity<MultiValueMap<String, String>> = HttpEntity(content, null)

        return try {
            restTemplate.postForEntity(
                "http://localhost:8080/realms/ticketing/protocol/openid-connect/logout",
                request,
                String::class.java)
        }catch (e: Exception){
            throw AuthExceptions.InvalidLogoutRequestException(e.message!!)
        }
    }

    override fun signup(userRegistration: AuthData.CustomerRegistration): ResponseEntity<Any> {

        // Create a Keycloak client
        val kc = KeycloakBuilder.builder()
            .serverUrl("http://localhost:8080")
            .realm("master")
            .clientId("admin-cli")
            .username("admin")
            .password("admin")
            .build();

        // Create a UserRepresentation object and set the user details
        val user = UserRepresentation()
        user.username = userRegistration.username
        user.email = userRegistration.email
        user.firstName = userRegistration.firstName
        user.lastName = userRegistration.lastName
        user.isEnabled = true
        user.isEmailVerified = true

        // Create a CredentialRepresentation object and set the password
        val credentials = CredentialRepresentation()
        credentials.isTemporary = false
        credentials.type = CredentialRepresentation.PASSWORD
        credentials.value = userRegistration.password

        user.credentials = listOf(credentials)

        try {
            // Use the Keycloak admin client to create the user in Keycloak
            val response = kc.realm("ticketing").users().create(user)
            val userId: String = CreatedResponseUtil.getCreatedId(response)
            val userResource = kc.realm("ticketing").users().get(userId)
            val customerRole = kc.realm("ticketing").roles().get("customer").toRepresentation()
            userResource.roles().realmLevel().add(listOf(customerRole))
        } catch (e: Exception) {
            throw AuthExceptions.UnableToSignUpException(e.message!!)
        }

        customerService.createCustomer(user.toCustomer())

        val successMessage = "Customer created successfully"
        val responseObject: Any = object : Any() {
            var message = successMessage
        }
        return ResponseEntity.ok<Any>(responseObject)
    }

    override fun expertSignup(userRegistration: AuthData.ExpertRegistration): ResponseEntity<Any> {

        // Create a Keycloak client
        val kc = KeycloakBuilder.builder()
            .serverUrl("http://localhost:8080")
            .realm("master")
            .clientId("admin-cli")
            .username("admin")
            .password("admin")
            .build();

        // Create a UserRepresentation object and set the user details
        val user = UserRepresentation()
        user.username = userRegistration.username
        user.email = userRegistration.email
        user.firstName = userRegistration.firstName
        user.lastName = userRegistration.lastName
        user.isEnabled = true
        user.isEmailVerified = true

        // Create a CredentialRepresentation object and set the password
        val credentials = CredentialRepresentation()
        credentials.isTemporary = false
        credentials.type = CredentialRepresentation.PASSWORD
        credentials.value = userRegistration.password

        user.credentials = listOf(credentials)

        try {
            // Use the Keycloak admin client to create the user in Keycloak
            val response = kc.realm("ticketing").users().create(user)
            val userId: String = CreatedResponseUtil.getCreatedId(response)
            val userResource = kc.realm("ticketing").users().get(userId)
            val expertRole = kc.realm("ticketing").roles().get("expert").toRepresentation()
            userResource.roles().realmLevel().add(listOf(expertRole))
        } catch (e: Exception) {
            throw AuthExceptions.UnableToSignUpException(e.message!!)
        }

        expertService.createExpert(user.toExpert())

        val successMessage = "Expert created successfully"
        val responseObject: Any = object : Any() {
            var message = successMessage
        }
        return ResponseEntity.ok<Any>(responseObject)
    }

    override fun createExpert(userRegistration: AuthData.ExpertRegistration): ResponseEntity<String> {

        // Create a Keycloak client
        val kc = KeycloakBuilder.builder()
            .serverUrl("http://localhost:8080")
            .realm("master")
            .clientId("admin-cli")
            .username("admin")
            .password("admin")
            .build();

        // Create a UserRepresentation object and set the user details
        val user = UserRepresentation()
        user.username = userRegistration.username
        user.email = userRegistration.email
        user.firstName = userRegistration.firstName
        user.lastName = userRegistration.lastName
        user.isEnabled = true
        user.isEmailVerified = true

        // Create a CredentialRepresentation object and set the password
        val credentials = CredentialRepresentation()
        credentials.isTemporary = false
        credentials.type = CredentialRepresentation.PASSWORD
        credentials.value = userRegistration.password

        user.credentials = listOf(credentials)

        try {
            // Use the Keycloak admin client to create the user in Keycloak
            val response = kc.realm("ticketing").users().create(user)
            val userId: String = CreatedResponseUtil.getCreatedId(response)
            val userResource = kc.realm("ticketing").users().get(userId)
            val expertRole = kc.realm("ticketing").roles().get("expert").toRepresentation()
            userResource.roles().realmLevel().add(listOf(expertRole))
        } catch (e: Exception) {
            throw AuthExceptions.UnableToSignUpException(e.message!!)
        }

        expertService.createExpert(user.toExpert().apply { expertise = userRegistration.expertise })

        return ResponseEntity.ok("Expert created successfully")
    }

}

fun UserRepresentation.toCustomer() : Customer {
    val customer = Customer::class.createInstance()

    customer.email = this.email
    customer.name = this.firstName
    customer.surname = this.lastName
    customer.role = "customer"

    return customer
}

fun UserRepresentation.toExpert() : Expert {
    val expert = Expert::class.createInstance()

    expert.email = this.email
    expert.name = this.firstName
    expert.surname = this.lastName
    expert.role = "expert"

    return expert
}