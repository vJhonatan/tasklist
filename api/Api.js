const BASE_URL = 'http://localhost:5186/api/Task'

export const getRequest = async () => {
    try {
        const response = await fetch(BASE_URL, {
            method: "GET",
            headers: {
                'Content-Type' : 'application/json'
            }
        });

        if(!response.ok){
            throw new Error(`GET request failed with status ${response.status}`);
        }

        const textData = await response.text();
        const data = JSON.parse(textData);

        return data;
    } catch (error) {
        console.error(error)
        throw error;
    }
}