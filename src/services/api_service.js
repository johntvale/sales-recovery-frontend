const API_URL = import.meta.env.VITE_API_URL;

/**
 * Sends a CSV file to the backend for strategic analysis.
 * @param {File} uploaded_file - The sales data file.
 * @returns {Promise<Object>} - The analysis results (churn, recovery potential, etc).
 */
export const processSalesDataAnalysis = async (uploaded_file, threshold = 60) => {
    const data_payload = new FormData();
    data_payload.append("file", uploaded_file);
    data_payload.append("threshold", threshold);

    try {
        const api_response = await fetch(`${API_URL}/analyze`, {
            method: "POST",
            body: data_payload,
        });

        if (!api_response.ok) {
            const error_details = await api_response.json();
            throw new Error(error_details.detail || "Analysis Error: Failed to process sales data.");
        }

        return await api_response.json();
    } catch (connection_error) {
        console.error("Network Error:", connection_error);
        throw connection_error;
    }
};