import privateClient from "../api/client/private_client";

const reviewEndpoints = {
    list: 'reviews',
    add: 'reviews',
    remove: ({ revieId }) => `/reviews/${revieId}`
}

const reviewApi = {
    add: async ({
        mediaId, mediaType, mediTitle, mediaPoster, content
    }) => {
        try {
            const response = await privateClient.post(
                reviewEndpoints.add,
                {
                    mediaId,
                    mediaType,
                    mediTitle,
                    mediaPoster,
                    content
                }
            )
            return { response }
        } catch (err) { return { err } }
    },
    remove: async ({ revieId }) => {
        try {
            const response = await privateClient.post(
                reviewEndpoints.remove, { revieId }
            )
            return { response }
        } catch (err) { return { err } }
    },
    getList: async () => {
        try {
            const response = await privateClient.post(
                reviewEndpoints.list
            )
            return { response }
        } catch (err) { return { err } }
    }
}

export default reviewApi