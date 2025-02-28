import axios from 'axios';
import axiosInstance from '../axiosInstance';

const API_URL = 'http://localhost:1238/auth/';

const login = async (username, password) => {
  try {
    const response = await axios.post(API_URL + 'authenticate', {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('There was an error logging in!', error);
    throw error;
  }
};

const getEmployeeById = async (id) => {
  try {
    const response = await axiosInstance.get(`/auth/${id}`);
    return response.data;
  } catch (error) {
    console.error('Member not found ', error);
    throw error;
  }
};

const getAllEmployees = async () => {
  try {
    const response = await axiosInstance.get('/auth');
    return response.data;
  } catch (error) {
    console.error('Error fetching employees', error);
    throw error;
  }
};


  



export default {
  login,
  getEmployeeById,
  getAllEmployees
  
};