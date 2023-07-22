import jwt_decode from "jwt-decode";

const jwtTokenKey = "jwtToken";

export const getJwtToken = () => {
    return localStorage.getItem(jwtTokenKey);
}

export const getDecodedJwtToken = () => {
    return jwt_decode(getJwtToken());
}

export const getUserRole = () => {
    return getDecodedJwtToken().resource_access.ticketing.roles[0];
}

export const setJwtToken = (access_token) => {
    localStorage.setItem(jwtTokenKey, access_token);
}

export const cleanSession = () => {
    localStorage.removeItem(jwtTokenKey);
}