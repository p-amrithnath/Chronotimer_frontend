import axios from 'axios';
import axiosInstance from '../axiosInstance';


const getAllProjects = async () => {
  try {
    const response = await axiosInstance.get('/projects/getAll');
    return response.data;
  } catch (error) {
    console.error('There was an error fetching the projects!', error);
    throw error;
  }
};

const getProjectById = async (id) => {
  try {
    const response = await axiosInstance.get(`/projects/getById/${id}`);
    return response.data;
  } catch (error) {
    console.error(`There was an error fetching the project with ID ${id}!`, error);
    throw error;
  }
};

const saveProject = async (project) => {
  try {
    const response = await axiosInstance.post('/projects/save', project);
    return response.data;
  } catch (error) {
    console.error('There was an error saving the project!', error);
    throw error;
  }
};

const updateProject = async (project) => {
  try {
    const response = await axiosInstance.put('/projects/edit', project);
    return response.data;
  } catch (error) {
    console.error('There was an error updating the project!', error);
    throw error;
  }
};

const deleteProject = async (id) => {
  try {
    await axiosInstance.delete(`/projects/delete/${id}`);
  } catch (error) {
    console.error(`There was an error deleting the project with ID ${id}!`, error);
    throw error;
  }
};

export default {
  getAllProjects,
  getProjectById,
  saveProject,
  updateProject,
  deleteProject,
};