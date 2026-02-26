import axiosInstance from './axiosInstance';

export const getDoctorUtilization = async () => {
  const response = await axiosInstance.get('/analytics/utilization');
  return response.data;
};

export const getDepartmentLoad = async () => {
  const response = await axiosInstance.get('/analytics/department-load');
  return response.data;
};

export const getAverageWaitingTime = async () => {
  const response = await axiosInstance.get('/analytics/average-waiting-time');
  return response.data;
};
