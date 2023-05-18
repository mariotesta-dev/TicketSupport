package it.polito.wa2.server.config

import org.springframework.security.oauth2.jwt.Jwt
import java.time.Instant

object JwtUtils {

    /**
     * Returns a list of roles associated with the user.
     */
    fun getRoles(jwt: Jwt): List<String>? {
        return jwt.claims["realm_access"]?.let { it as? Map<String, List<String>> }?.get("roles")
    }

    /**
     * Returns the user's email.
     */
    fun getEmail(jwt: Jwt): String? {
        return jwt.claims["email"] as? String
    }

    /**
     * Returns the user's full name.
     */
    fun getName(jwt: Jwt): String? {
        return jwt.claims["name"] as? String
    }

    /**
     * Returns the user's preferred username.
     */
    fun getPreferredUsername(jwt: Jwt): String? {
        return jwt.claims["preferred_username"] as? String
    }

    /**
     * Returns the user's given name (first name).
     */
    fun getGivenName(jwt: Jwt): String? {
        return jwt.claims["given_name"] as? String
    }

    /**
     * Returns the user's family name (last name).
     */
    fun getFamilyName(jwt: Jwt): String? {
        return jwt.claims["family_name"] as? String
    }

    /**
     * Returns whether the user's email is verified.
     */
    fun isEmailVerified(jwt: Jwt): Boolean {
        return jwt.claims["email_verified"] as? Boolean ?: false
    }

    /**
     * Returns the subject of the JWT, which is usually the user ID.
     */
    fun getSubject(jwt: Jwt): String? {
        return jwt.subject
    }

    /**
     * Returns the expiration date of the JWT.
     */
    fun getExpiration(jwt: Jwt): Instant? {
        return jwt.expiresAt
    }

    /**
     * Returns the issuer of the JWT.
     */
    fun getIssuer(jwt: Jwt): String? {
        return jwt.issuer?.toString()
    }
}
