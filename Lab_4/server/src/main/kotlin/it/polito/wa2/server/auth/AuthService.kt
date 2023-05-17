package it.polito.wa2.server.auth

import org.springframework.http.ResponseEntity

interface AuthService {

    fun login(credentials: AuthController.Credentials): ResponseEntity<String>

    fun logout(refreshToken: AuthController.RefreshToken): ResponseEntity<String>
}