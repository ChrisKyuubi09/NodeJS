const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
    .then(()=>console.log('Connected to DB...'))
    .catch(err => console.error('Could not connect to mongoDb',err));

const courseSchema = new mongoose.Schema({
    name: { 
      type: String , 
      required: true,
        minlength:5,
        maxlength: 255
       },
    category: {
      type: String,
      required: true,
      enum: ['web','mobile','network'],
      lowercase: true,
      trim: true
    },
    author:String,
    tags: {
      type: Array,
      validate: {
        isAsync: true,
        validator: function(v,callback) {
          setTimeout( () => {
            const result = v && v.maxlength > 0;
          },4000 );
        },
        message: 'A course should hace at least one tag.'
      }
    },
    date:{type:Date,default: Date.now},
    isPublished:Boolean,
    price: { 
      type: Number, 
      required: function() {return this.isPublished},
      get: v => Math.round(v), 
      set: v => Math.round(v)
    }
   });

async function createCourse() {
    const Course = mongoose.model('Course',courseSchema);
    const course = new Course({
        name:'Angular',
        author:'Chris',
        tags:['node','background'],
        isPublished:true,
        category: 'Web',
        price: 15.8
    });

    try{
      // const result = await course.save();
      // console.log(result);
      await course.validate();
    }
    catch (ex){
      //console.log(ex.message);
      for (field in ex.errors){
        console.log(ex.errors[field].message);
      }
    }
    
}

createCourse();

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
  const course = await Course.findByIdAndUpdate(id,{
    $set: {
      author:'Mosh',
      isPublished: false
    }
  }, { new: true });

  console.log(course);
}

updateFirst('61e0111ce8a5dad9b1187a18');

/////////////////////////////////////////////

async function removeCourse(id) {
  const Course = mongoose.model('Course',courseSchema);
  //const course = await Course.deleteOne({ _id:id });
  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}

removeCourse('61e0111ce8a5dad9b1187a18')