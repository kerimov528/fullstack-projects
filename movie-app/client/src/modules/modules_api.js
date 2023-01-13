import privateClient from '../api/client/private_client'
import publicClient from '../api/client/public_client'

const userEndpoints = {
    signin: 'user/signin',
    signup: 'user/signup',
    getInfo: 'user/info',
    passwordUpdate: 'user/update-password',
    getFavourites: 'user/favourites',
    addFavourites: 'user/favourites'
}

const userApi = {
    signin: async ({ username, password }) => {
        try {
            const response = await publicClient.post(
                userEndpoints.signin,
                { username, password }
            )

            return { response }
        } catch (err) { return { err } }
    },
    signup: async ({ username, password, confirmPassword, displayName }) => {
        try {
            const response = await publicClient.post(
                userEndpoints.signup,
                { username, password, confirmPassword, displayName }
            )
            return { response }
        } catch (err) { return { err } }
    },
    getInfo: async ({ }) => {
        try {

        } catch (err) { return { err } }
    },
    passwordUpdate: async ({ }) => {
        try {

        } catch (err) { return { err } }
    },
    getFavourites: async ({ }) => {
        try {

        } catch (err) { return { err } }
    },
    addFavourites: async ({ }) => {
        try {

        } catch (err) { return { err } }
    }
}

