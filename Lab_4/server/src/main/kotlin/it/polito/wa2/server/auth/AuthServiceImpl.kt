package it.polito.wa2.server.auth

import it.polito.wa2.server.tickets.TicketRepository
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.stereotype.Service
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.client.RestTemplate

@Service
class AuthServiceImpl(): AuthService {

    val restTemplate = RestTemplate()

    override fun login(credentials: AuthController.Credentials): ResponseEntity<String> {
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

    override fun logout(refreshToken: AuthController.RefreshToken): ResponseEntity<String> {
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
}