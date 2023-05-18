package it.polito.wa2.server.config

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper
import org.springframework.security.oauth2.jwt.Jwt
import org.springframework.security.oauth2.jwt.JwtDecoder
import org.springframework.security.oauth2.jwt.JwtDecoders
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter
import org.springframework.security.web.SecurityFilterChain
import javax.ws.rs.HttpMethod

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true, securedEnabled = true)
class SecurityConfiguration {


    @Bean
    fun jwtDecoder(): JwtDecoder {
        return JwtDecoders.fromIssuerLocation("http://localhost:8080/realms/ticketing")
    }

    @Bean
    fun jwtAuthenticationConverter(): JwtAuthenticationConverter {
       val converter = JwtAuthenticationConverter()
        converter.setJwtGrantedAuthoritiesConverter {
            jwt: Jwt -> jwt
            .getClaim<Map<String, List<String>>>("realm_access")["roles"]
            ?.map{ SimpleGrantedAuthority("ROLE_${it.uppercase()}") }
        }
        return converter
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.csrf().disable()
            .authorizeHttpRequests()
            .requestMatchers("auth/**").permitAll()
            .requestMatchers(HttpMethod.PUT,"/API/customers/**").hasRole("CUSTOMER")
            .requestMatchers(HttpMethod.GET, "/API/experts/**").hasRole("MANAGER")
            .requestMatchers(HttpMethod.POST, "/API/messages/**").hasAnyRole("CUSTOMER","EXPERT")

            .requestMatchers(HttpMethod.GET, "/API/tickets/*/messages").hasAnyRole("CUSTOMER","EXPERT")
            .requestMatchers(HttpMethod.GET, "/API/tickets/**").hasRole("MANAGER")
            .requestMatchers(HttpMethod.POST, "/API/tickets/**").hasRole("CUSTOMER")
            .requestMatchers(HttpMethod.PUT, "/API/tickets/*/expert").hasRole("MANAGER")
            .requestMatchers(HttpMethod.PUT, "/API/history/in_progress/**").hasRole("MANAGER")
            .requestMatchers(HttpMethod.PUT, "/API/history/**").hasAnyRole("EXPERT","MANAGER")

            .requestMatchers(HttpMethod.POST, "/API/warranties/**").hasRole("CUSTOMER")
            .requestMatchers(HttpMethod.PUT, "/API/warranties/*/extend").hasRole("EXPERT")
            .requestMatchers(HttpMethod.PUT, "/API/warranties/*/subscribe").hasRole("CUSTOMER") // subscribeProduct

            .anyRequest().authenticated()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .oauth2ResourceServer()
            .jwt()
            .jwtAuthenticationConverter(jwtAuthenticationConverter())
        return http.build()
    }
}