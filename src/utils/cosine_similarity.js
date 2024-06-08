import axios from "axios";

export async function callCosineSimilarityEndpoint(vector1, vector2) {
    // Make HTTP request to your endpoint
    const response = await axios.post('http://localhost:8000/calculate_similarity', { vector1, vector2 });

    // Extract similarity score and result from response
    const { similarity_score } = response.data;

    return { similarity_score };
}