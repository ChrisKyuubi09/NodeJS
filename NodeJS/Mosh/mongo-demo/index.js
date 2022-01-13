const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('Connected to DB...'))
    .catch(err => console.error('Could not connect to mongoDb',err));

const courseSchema = new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type:Date,default: Date.now},
    isPublished:Boolean
});

// async function createCourse() {
//     const Course = mongoose.model('Course',courseSchema);
//     const course = new Course({
//         name:'Angular',
//         author:'Chris',
//         tags:['node','background'],
//         isPublished:true
//     });
    
//     const result = await course.save();
//     console.log(result);
// }

// createCourse();

async function getCourses() {
    const Course = mongoose.model('Course',courseSchema);
  const courses =  await Course.find();
  console.log(courses);
}

getCourses();

async function getCourse() {
    const Course = mongoose.model('Course',courseSchema);
  const courses =  await Course.find( {author:'Mosh'})
                                .limit(3).sort({name:1}).select({name:1,author:1});
  console.log(courses);
}

getCourse();

