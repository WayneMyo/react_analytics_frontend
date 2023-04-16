import axios from 'axios';

const API_URL = 'http://localhost:8000';

export const generateDashboard = async (dashboardParams, file) => {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(dashboardParams).forEach((key) => {
        formData.append(key, dashboardParams[key]);
    });

    const response = await axios.post(`${API_URL}/generate_dashboard`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });

    return response.data;
};

export const dataInsights = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/data_insights`, formData);
    return response.data;
};

export const correlationHeatmap = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/correlation_heatmap`, formData);
    return response.data;
};

export const exportToWord = async (dashboardParams, file) => {
    const formData = new FormData();
    formData.append('file', file);
    Object.keys(dashboardParams).forEach((key) => {
        formData.append(key, dashboardParams[key]);
    });

    const response = await axios.post(`${API_URL}/export_to_word`, formData, {
        responseType: 'blob',
    });

    // Create a download link and simulate a click to download the file
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'insights.docx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
