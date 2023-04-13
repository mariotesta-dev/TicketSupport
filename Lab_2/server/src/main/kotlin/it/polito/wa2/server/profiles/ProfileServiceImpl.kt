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

    override fun updateProfile(email: String, profile: Profile): ProfileDTO {

        if(profileRepository.existsById(email)){

            if(email != profile.email && profileRepository.existsById(profile.email)){
                throw ProfileExceptions.ProfileAlreadyExistsException("Profile with email ${profile.email} already exists")
            }

            // If the email is changed, delete the old profile because the email is the primary key
            if(email != profile.email){
                profileRepository.deleteById(email)
            }

            return profileRepository.save(profile).toDTO()
        } else {
            throw ProfileExceptions.ProfileNotFoundException("Profile with email $email not found")
        }
    }
}