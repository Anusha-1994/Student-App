const express                   = require('express');
const app                       = express();
const cors                      = require('cors');
const bodyParser                = require('body-parser');
const studentService            = require('./controllers/student.service')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());


app.put('/students', (req, res) => {
  studentService.createStudentDetails(req, res)
});

app.get('/students', (req, res) => {
  studentService.getStudentDetails(req, res)
});


app.use(errorHandler);

app.listen(8000, () => {
  console.log('App listening on port 8000!')
});



function errorHandler(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
      // jwt authentication error
      return res.status(401).json({ message: 'Invalid Token' });
  }
}