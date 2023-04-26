package it.polito.wa2.server.profiles

import it.polito.wa2.server.tickets.TicketDTO
import it.polito.wa2.server.tickets.TicketExceptions
import it.polito.wa2.server.tickets.TicketRepository
import it.polito.wa2.server.tickets.toDTO
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Service

@Service
class ProfileServiceImpl(private val profileRepository: ProfileRepository, private val ticketRepository: TicketRepository): ProfileService {
    override fun getProfile(email: String): ProfileDTO {

        val response = profileRepository.findProfileByEmail(email)
            ?: throw ProfileExceptions.ProfileNotFoundException("Profile with email $email not found")

        return response.toDTO()
    }

    override fun getProfileById(profileId: Long): ProfileDTO {

        val response = profileRepository.findById(profileId).orElse(null)
            ?: throw ProfileExceptions.ProfileNotFoundException("Profile with id $profileId not found")

        return response.toDTO()
    }

    override fun createProfile(profile: Profile): ProfileDTO {
        val profileFound = profileRepository.findProfileByEmail(profile.email)

        if(profileFound == null){
            return profileRepository.save(profile).toDTO()
        } else {
            throw ProfileExceptions.ProfileAlreadyExistsException("Profile with email ${profile.email} already exists")
        }
    }

    override fun updateProfile(email: String, profile: Profile): ProfileDTO {

        if(profileRepository.findProfileByEmail(email) != null){

            if(email != profile.email && profileRepository.findProfileByEmail(profile.email) != null){
                throw ProfileExceptions.ProfileAlreadyExistsException("Profile with email ${profile.email} already exists")
            }

            return profileRepository.save(profile).toDTO()
        } else {
            throw ProfileExceptions.ProfileNotFoundException("Profile with email $email not found")
        }
    }
}