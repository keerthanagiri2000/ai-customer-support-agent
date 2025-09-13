// Api base url
const API_BASE_URL = "https://ai-customer-support-agent-eq4d.onrender.com/api";

const AUTH = {
    REGISTER: `${API_BASE_URL}/auth/signup`,
    LOGIN: `${API_BASE_URL}/auth/login`,
};

const CHAT = {
    SEND: `${API_BASE_URL}/chat/send`,
    HISTORY: `${API_BASE_URL}/chat/history`,
};

export { AUTH, CHAT };