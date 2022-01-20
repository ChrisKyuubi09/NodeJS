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
                                .limit(3).sort({name:1})
                                .select({name:1,author:1});
  console.log(courses);
}

getCourse();


async function getCoursesOverTen() {
  const Course = mongoose.model('Course',courseSchema);
  const courses = await Course.find({price:{$gt:10, $lte:20}}).select({name:1});

  console.log('////////');
  console.log(courses);
}

getCoursesOverTen();

async function getCoursesMosh() {
  const Course = mongoose.model('Course',courseSchema);
  const courses = await Course.find()
                              .or([{author:'Mosh'},{isPublished:true}])
                              .limit(2)
                              .select({name:1,author:1});
  console.log(courses);
}
getCoursesMosh();

async function RegEx() {
  const Course = mongoose.model('Course',courseSchema);
  const courses = await Course.find({author: /^Chris/})
                              .find({author: /Mosh$/})
                              .find({author: /.*Mosh.*/i})
                              .limit(3)
                              .select({name:1,author:1});
  console.log('/////');
  console.log(courses);
}
RegEx();

async function CountER() {
  const Course = mongoose.model('Course',courseSchema);
  const courses = await Course.find({author: /^Chris/})
                              .find({author: /Mosh$/})
                              .find({author: /.*Mosh.*/i})
                              .limit(3)
                              .count();
  console.log('/////');
  console.log(courses);
}
CountER();

async function Paginization() {

  const pageNumber = 2;
  const pageSize = 10;

  const Course = mongoose.model('Course',courseSchema);
  const courses = await Course.find({author: /^Chris/})
                              .find({author: /Mosh$/})
                              .find({author: /.*Mosh.*/i})
                              .skip((pageNumber - 1) * pageSize)
                              .limit(pageSize)
                              .count();
  console.log('/////');
  console.log(courses);
}
Paginization();

/////////////////////////////////////////////////////////////////////
//UPDATE


async function update(id) {
  const Course = mongoose.model('Course',courseSchema);
  const course = await Course.findById(id);

  if(!course) return console.log('failed');
    course.set({
      isPublished: true,
      author: 'Another Author'
    });

    const result = await course.save();
    console.log(result);
}

update('5a68fde3f09ad7646ddec17e');

async function updateFirst(id) {
  const Course = mongoose.model('Course',courseSchema);
  const result = await Course.findByIdAndUpdate(id,{
    $set: {
      author:'Jason',
      isPublished: false
    }
  }, { new: true });

  console.log(result);
}

updateFirst('5a68fde3f09ad7646ddec17e');