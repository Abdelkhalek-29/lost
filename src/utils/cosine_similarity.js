import axios from "axios";
import FormData from "form-data";


export async function callCosineSimilarityEndpoint(vector1, vector2) {
  // Make HTTP request to your endpoint
  const response = await axios.post(
    "http://localhost:8000/calculate_similarity",
    { vector1, vector2 }
  );

  // Extract similarity score and result from response
  const { similarity_score, result } = response.data;

  return { similarity_score, result };
}



// Helper function to download image from a URL and save it locally
async function fetchImage(url) {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    return Buffer.from(response.data, 'binary');
}

export async function compare_faces(v1, v2) {
    try {
        // Fetch images
        const personImageBuffer = await fetchImage(v1);
        const verificationImageBuffer = await fetchImage(v2);

        // Prepare form data
        const formData = new FormData();
        formData.append('person_image', personImageBuffer, 'person_image.jpg');
        formData.append('verification_image', verificationImageBuffer, 'verification_image.jpg');

        // Send POST request
        const response = await axios.post("https://matching-jrcnqdtrua-ww.a.run.app/compare_faces/", formData, {
            headers: {
                ...formData.getHeaders(),
            },
        });

        return response.data.result;
    } catch (error) {
        console.error(error);
        return { error: "Comparison failed" };
    }
}
