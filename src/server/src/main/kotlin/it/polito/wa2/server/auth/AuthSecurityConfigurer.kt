package it.polito.wa2.server.auth

import it.polito.wa2.server.config.SecurityConfigurerInterface
import it.polito.wa2.server.config.SecurityRoles
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.stereotype.Component

@Component
class AuthSecurityConfigurer : SecurityConfigurerInterface {

    override fun configure(http: HttpSecurity) {
        http.csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers("auth/**").permitAll()
            .requestMatchers(HttpMethod.POST, "auth/expert_signup").hasRole(SecurityRoles.MANAGER)
    }
}