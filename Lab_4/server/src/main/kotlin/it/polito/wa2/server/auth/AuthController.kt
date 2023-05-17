package it.polito.wa2.server.auth
import jakarta.servlet.http.HttpServletRequest
import jakarta.servlet.http.HttpServletResponse
import org.jboss.resteasy.annotations.jaxrs.HeaderParam
import org.springframework.http.HttpEntity
import org.springframework.http.HttpHeaders
import org.springframework.http.HttpStatus
import org.springframework.http.MediaType
import org.springframework.http.ResponseEntity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate

@RestController
class AuthController {

    val restTemplate = RestTemplate()

    data class Credentials(
        val grant_type: String = "password",
        val client_id: String = "ticketing",
        val username: String,
        val password: String
    )

    @PostMapping("/auth/login")
    fun login(@RequestBody credentials: Credentials) : ResponseEntity<String> {
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


    data class RefreshToken(
        val clientId: String = "ticketing",
        val refresh_token: String
    )

    @PostMapping("/auth/logout")
    fun logout(@RequestBody refreshToken: RefreshToken) : ResponseEntity<String> {

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
            throw AuthExceptions.InvalidLoginRequestException(e.localizedMessage)
        }

    }

}