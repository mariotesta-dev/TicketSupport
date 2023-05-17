package it.polito.wa2.server.auth
import org.springframework.http.HttpEntity
import org.springframework.http.ResponseEntity
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.client.RestTemplate

@RestController
class AuthController(private val authService: AuthService) {

    data class Credentials(
        val grant_type: String = "password",
        val client_id: String = "ticketing",
        val username: String,
        val password: String
    )

    @PostMapping("/auth/login")
    fun login(@RequestBody credentials: Credentials) : ResponseEntity<String> {
        return authService.login(credentials)
    }


    data class RefreshToken(
        val clientId: String = "ticketing",
        val refresh_token: String
    )

    @PostMapping("/auth/logout")
    fun logout(@RequestBody refreshToken: RefreshToken) : ResponseEntity<String> {
        return authService.logout(refreshToken)
    }

}