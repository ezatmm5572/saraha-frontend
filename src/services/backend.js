import api from "./api"

export const backend = {
    signUp: (payload) => api.post("/user/signUp", payload),

    signIn: (payload) => api.post("/user/signIn", payload),

    signUpWithGoogle: (payload) =>
        api.post("/user/signUp/gmail", payload),

    getProfile: () => api.get("/user/profile"),

    getMyMessages: () => api.get("/user/messages"),

    getAIInsights: () => api.get("/ai/message-insights"),

    sendMessage: (userID, payload) =>
        api.post(`/messages/message/${userID}`, payload)
}