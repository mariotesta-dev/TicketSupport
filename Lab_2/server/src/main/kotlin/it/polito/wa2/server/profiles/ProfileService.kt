package it.polito.wa2.server.profiles

import it.polito.wa2.server.tickets.TicketDTO

interface ProfileService {
    fun getProfile(email: String) : ProfileDTO

    fun getProfileById(profileId: Long) : ProfileDTO
    fun createProfile(profile: Profile) : ProfileDTO
    fun updateProfile(email: String, profile: Profile) : ProfileDTO
}