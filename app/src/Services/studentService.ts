import api from './api';

class StudentService {
    getStudentDetails = async () => api.get(`/students`);
    createUpdateStudent = async (data: any) => api.put(`/students`, data)
}

export default new StudentService()