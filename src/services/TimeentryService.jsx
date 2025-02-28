import axios from 'axios';
import axiosInstance from '../axiosInstance';


const TimeentryService = {
    findByDateAndEmployeeId: async (employeeId, date) => {
        try {
            const response = await axiosInstance.get(`/timeentry/fetch/${employeeId}/${date}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching timesheet:', error);
            throw error;
        }
    },

    submitTimeentries: async (employeeId, date) => {
        try {
            await axiosInstance.patch(`/timesheets/submit/${employeeId}/${date}`);
        } catch (error) {
            console.error('Error submitting time entries:', error);
            throw error;
        }
    },

    updateTimeEntry: async (id, timeEntryDetails) => {
        try {
            const response = await axiosInstance.patch(`/timeentry/${id}`, timeEntryDetails);
            return response.data;
        } catch (error) {
            console.error('Error updating time entry:', error);
            throw error;
        }
    },

    deleteTimeEntry: async (id) => {
        try {
            await axiosInstance.delete(`/timeentry/${id}`);
        } catch (error) {
            console.error('Error deleting time entry:', error);
            throw error;
        }
    },

    approveReject: async (request) => {
        try {
            await axiosInstance.patch(`/timeentry/approve-reject`, request);
        } catch (error) {
            console.error('Error approving/rejecting time entry:', error);
            throw error;
        }
    },

    createTimesheet: async (request) => {
        try{

            await axiosInstance.post(`timeentry/`,request);

        }catch(error){
            console.error('Error in addind the time entry!',error);
            throw error;
        }
    }
};

export default TimeentryService;