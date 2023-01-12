import tmdbConfig from "./tmdb_config"

const { getUrl } = tmdbConfig

const mediaEndpoints = {
    mediaList: ({ mediaType, mediaCategory, page }) => getUrl(
        `${mediaType}/${mediaCategory}`, page
    ),
    mediaDetail: ({ mediaType, mediaId }) => getUrl(
        `${mediaType}/${mediaId}`
    ),
    mediaGenres: ({ mediaType }) => getUrl(
        `genres/${mediaType}/list`
    ),
    mediaCredits: ({ mediaType, mediaId }) => getUrl(
        `${mediaType}/${mediaId}/credits`
    ),
    mediaVideos: ({ mediaType, mediaId }) => getUrl(
        `${mediaType}/${mediaId}/videos`
    ),
    mediaRecommend: ({ mediaType, mediaId }) => getUrl(
        `${mediaType}/${mediaId}/recommendation`
    ),
    mediaImages: ({ mediaType, mediaId }) => getUrl(
        `${mediaType}/${mediaId}/images`
    ),
    mediaSearch: ({ mediaType, query, page }) => getUrl(
        `search/${mediaType}`, { query, page }
    ),
    personDetail: ({ personId }) => getUrl(
        `person/${personId}`
    ),
    personMedias: ({ personId }) => getUrl(
        `person/${personId}/combined_credits`
    ),
}

export default mediaEndpoints