import axios from 'axios';

// In development, Vite proxies '/api' to 'http://localhost:5000'
// You can also override with VITE_API_URL if needed
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Services API
export const getServices = async (search = '') => {
  const params = search ? { search } : {};
  const response = await API.get('/services', { params });
  return response.data;
};

export const getServiceById = async (id) => {
  const response = await API.get(`/services/${id}`);
  return response.data;
};

export const createService = async (serviceData) => {
  const response = await API.post('/services', serviceData);
  return response.data;
};

export const updateService = async (id, serviceData) => {
  const response = await API.put(`/services/${id}`, serviceData);
  return response.data;
};

export const deleteService = async (id) => {
  const response = await API.delete(`/services/${id}`);
  return response.data;
};

// Bookings API
export const createBooking = async (bookingData) => {
  const response = await API.post('/bookings', bookingData);
  return response.data;
};

export const getBookings = async () => {
  const response = await API.get('/bookings');
  return response.data;
};

export const deleteBooking = async (id) => {
  const response = await API.delete(`/bookings/${id}`);
  return response.data;
};

// Contact API
export const createContact = async (contactData) => {
  const response = await API.post('/contact', contactData);
  return response.data;
};

export const getContacts = async () => {
  const response = await API.get('/contact');
  return response.data;
};

export default API;
