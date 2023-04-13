package it.polito.wa2.server.profiles

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ProfileController(private val profileService: ProfileService) {

    @GetMapping("/API/profiles/{email}")
    fun getProfile(@PathVariable email: String) =
        profileService.getProfile(email)

    @PostMapping("/API/profiles")
    fun createProfile(@RequestBody profile: Profile) =
        profileService.createProfile(profile)


    @PutMapping("/API/profiles/{email}")
    fun updateProfile(@PathVariable email: String, @RequestBody profile: Profile) =
        profileService.updateProfile(email, profile)
}