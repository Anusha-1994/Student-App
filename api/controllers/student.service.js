const db            = require("../helpers/db");
const Student       = db.Student;
const errorCode     = require('../config/errorCode')
const constants     = require('../config/constants')
const validation    = require('../helpers/validation')



exports.getStudentDetails = (async (request, response) => {
 try {
        let studentDetails = await Student.find();
        return response.status(200).send({
            result: studentDetails
        });
    } catch (error) {
        return response.status(500).send({
            code   : errorCode.unknown_error,
            message: constants.message.unknown_error
        });
    }

})

exports.createStudentDetails = (async (request, response) => {
   

    try {
        if (validation.isEmpty(request.body.Name)) {
            return response.status(400).send({
                 code: errorCode.name_required,
                 message: constants.message.name_required
             });
        }
        if (request.body._id && request.body._id.length > 0) {
            await Student.findOneAndUpdate({
                _id: request.body._id
            }, request.body)
        }
        else {
            let Studentdata = new Student({
                Name         : request.body.Name,
                StudentId    : request.body.StudentId,
                Course       : request.body.Course,
                Score        : request.body.Score,
                dateOfBirth  : request.body.dateOfBirth,
            })
            await Studentdata.save();
           
        }
        return response.status(200).send({
            message: constants.message.success
        });
      

    }
    catch(error){
        return response.status(500).send({
            code: errorCode.unknown_error,
            message: constants.message.unknown_error
        });
    }


})
