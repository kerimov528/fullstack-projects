const baseUrl = process.env.TMDB_URL_BASE
const key = process.env.TMDB_KEY

const getUrl = (endpoint, params) => {
    const qs = new URLSearchParams(params)

    return `${baseUrl}${endpoint}?api_key=${key}&${qs}`
}

export default { getUrl }