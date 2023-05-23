package it.polito.wa2.server.auth

import org.springframework.http.ResponseEntity

interface AuthService {

    fun login(credentials: AuthData.Credentials): ResponseEntity<String>

    fun logout(refreshToken: AuthData.RefreshToken): ResponseEntity<String>

    fun signup(customerRegistration: AuthData.CustomerRegistration): ResponseEntity<String>

    fun createExpert(customerRegistration: AuthData.ExpertRegistration): ResponseEntity<String>
}