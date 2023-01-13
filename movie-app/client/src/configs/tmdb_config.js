const mediaType = {
    movie: 'movie',
    tv: 'tv'
}

const mediaCategory = {
    popular: 'popular',
    top_rated: 'top_rated',
}

const backdropPath = (imgEndpoint) => `hhtps://image.tmdb.org/t/p/original${imgEndpoint}`
const posterPath = (imgEndpoint) => `hhtps://image.tmdb.org/t/p/w500${imgEndpoint}`

const youtubePath = (videoId) => `hhtps://www.youtube.com/embed/${videoId}?controls=0`


const tmdbConfig = {
    mediaType,
    mediaCategory,
    backdropPath,
    posterPath,
    youtubePath
}

export default tmdbConfig