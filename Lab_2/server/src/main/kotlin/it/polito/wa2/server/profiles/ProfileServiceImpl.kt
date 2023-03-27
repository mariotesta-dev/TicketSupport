package it.polito.wa2.server.profiles

import org.springframework.stereotype.Service

@Service
class ProfileServiceImpl(private val profileRepository: ProfileRepository): ProfileService {
    override fun getProfile(email: String): ProfileDTO {
        val response = profileRepository.findById(email).orElse(null)
            ?: throw ProfileExceptions.ProfileNotFoundException("Profile with email $email not found")

        return response.toDTO()
    }

    override fun createProfile(profile: Profile): ProfileDTO {
        val profileExists = profileRepository.existsById(profile.email)

        if(!profileExists){
            return profileRepository.save(profile).toDTO()
        } else {
            throw ProfileExceptions.ProfileAlreadyExistsException("Profile with email ${profile.email} already exists")
        }
    }
}