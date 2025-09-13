import dotenv from "dotenv";

dotenv.config();

const HUGGING_FACE_API_TOKEN = process.env.HUGGING_FACE_API_TOKEN;
const HUGGING_FACE_MODEL = process.env.HUGGING_FACE_MODEL;

export const getAIResponse = async (messages) => {
    try {
    const data = {
        messages,
        model: HUGGING_FACE_MODEL,
    };

    const response = await fetch(
		"https://router.huggingface.co/v1/chat/completions",
		{
			headers: {
				Authorization: `Bearer ${HUGGING_FACE_API_TOKEN}`,
				"Content-Type": "application/json",
			},
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result.choices[0].message;

    } catch (error) {
        return null;
    }
}