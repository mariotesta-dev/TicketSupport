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

    @PostMapping("/auth/login")
    fun login(@RequestBody credentials: AuthData.Credentials) : ResponseEntity<String> {
        return authService.login(credentials)
    }

    @PostMapping("/auth/signup")
    fun signup(@RequestBody customerRegistration: AuthData.CustomerRegistration) : ResponseEntity<String> {
        return authService.signup(customerRegistration)
    }


    @PostMapping("/auth/logout")
    fun logout(@RequestBody refreshToken: AuthData.RefreshToken) : ResponseEntity<String> {
        return authService.logout(refreshToken)
    }

}