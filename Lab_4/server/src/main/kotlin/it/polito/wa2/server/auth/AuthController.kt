package it.polito.wa2.server.auth
import io.micrometer.observation.annotation.Observed
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
@Observed
class AuthController(private val authService: AuthService) {

    @PostMapping("/auth/login")
    fun login(@RequestBody credentials: AuthData.Credentials) : ResponseEntity<String> {
        val log: Logger = LoggerFactory.getLogger("logger")
        log.info("received login request, credentials = {}.", credentials);
        return authService.login(credentials)
    }

    @PostMapping("/auth/signup")
    fun signup(@RequestBody customerRegistration: AuthData.CustomerRegistration) : ResponseEntity<String> {
        val log: Logger = LoggerFactory.getLogger("logger")
        log.info("received signup request, customerRegistration = {}.", customerRegistration);
        return authService.signup(customerRegistration)
    }


    @PostMapping("/auth/logout")
    fun logout(@RequestBody refreshToken: AuthData.RefreshToken) : ResponseEntity<String> {
        val log: Logger = LoggerFactory.getLogger("logger")
        log.info("received signup request, refreshToken = {}.", refreshToken);
        return authService.logout(refreshToken)
    }

}