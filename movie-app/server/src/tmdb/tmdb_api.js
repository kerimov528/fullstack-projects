import axiosClient from "../axios/axios_client";
import tmdbEndpoints from './tmdb_endpoint'

const { get } = axiosClient
const { mediaList, mediaDetail, mediaGenres, mediaCredits, mediaVideos, mediaImages, mediaRecommend, mediaSearch, personDetail, personMedias } = tmdbEndpoints

const tmdbApi = {
    mediaList: async ({ mediaType, mediaCategory, page }) => await get(
        mediaList({ mediaType, mediaCategory, page })
    ),
    mediaDetail: async ({ mediaType, mediaId }) => await get(
        mediaDetail({ mediaType, mediaId })
    ),
    mediaGenres: async ({ mediaType }) => await get(
        mediaGenres({ mediaType })
    ),
    mediaCredits: async ({ mediaType, mediaId }) => await get(
        mediaCredits({ mediaType, mediaId })
    ),
    mediaVideos: async ({ mediaType, mediaId }) => await get(
        mediaVideos({ mediaType, mediaId })
    ),
    mediaImages: async ({ mediaType, mediaId }) => await get(
        mediaImages({ mediaType, mediaId })
    ),
    mediaRecommend: async ({ mediaType, mediaId }) => await get(
        mediaRecommend({ mediaType, mediaId })
    ),
    mediaSearch: async ({ mediaType, query, page }) => await get(
        mediaSearch({ mediaType, query, page })
    ),
    personDetail: async ({ personId }) => await get(
        personDetail({ personId })
    ),
    personMedias: async ({ personId }) => await get(
        personMedias({ personId })
    )

}

export default tmdbApi