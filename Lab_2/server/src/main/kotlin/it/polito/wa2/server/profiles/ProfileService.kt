package it.polito.wa2.server.profiles

interface ProfileService {
    fun getProfile(email: String) : ProfileDTO
    fun createProfile(profile: Profile) : ProfileDTO

    fun updateProfile(email: String, profile: Profile) : ProfileDTO
}