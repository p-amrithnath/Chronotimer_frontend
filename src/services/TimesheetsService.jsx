import axiosInstance from '../axiosInstance';

const getmonthlyTimesheet = async (month,year,employeeId) => {
    try{
        const response = await axiosInstance.get(`/timesheets/monthly/${month}/${year}/${employeeId}`)
        return response.data;
    }
    catch(error){
        console.error("Error in fetching monthly hours!",error)
        throw error;
    }

};


export default {
    getmonthlyTimesheet
    
  };