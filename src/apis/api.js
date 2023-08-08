import axios from "../utils/axios";

const API = () => ({
  getAmounts: () => axios.get('/amounts'),
  getUsers: () => axios.get('/users'),
  getCategories: () => axios.get('/categories'),
  getClasses: () => axios.get('/classes'),
  createUser: ({ fullName, telId, phoneNumber }) => axios.post('/users', { fullName, telId, phoneNumber }),
  createCategory: ({ name, voices }) => axios.post('/categories', { name, voices }),
  createClass: ({ code, categoryIds, userIds, createdBy }) => axios.post('/classes', { code, categoryIds, userIds, createdBy }),
});

export default API();