import { observable, decorate, action } from 'mobx';
import Constant from '../Global/Constant';
import studentService from '../Services/studentService';

class StudentStore {
    Students: Array<any> = [];

    async getStudentDetails(callback: any) {
        try {
            const response = await studentService.getStudentDetails();
            this.Students = response.data.result;
            callback(null);
        } catch (err) {
            let errorMsg = Constant.defaultErrorMessage;
            if (err && err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }
            callback(new Error(errorMsg));
        }
    }

    async createUpdateStudent(details: any, callback: any) {
        try {
            const response = await studentService.createUpdateStudent(details);
            callback(null);
        } catch (err) {
            let errorMsg = Constant.defaultErrorMessage;
            if (err && err.response && err.response.data && err.response.data.message) {
                errorMsg = err.response.data.message;
            }
            callback(new Error(errorMsg));

        }
    }

}

decorate(StudentStore, {
    Students           : observable,
    getStudentDetails  : action,
    createUpdateStudent: action
});

export default new StudentStore();
