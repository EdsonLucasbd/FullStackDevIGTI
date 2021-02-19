import mongoose from 'mongoose';

gradesSchemas = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  subject: {
    type: String,
    require: true
  },
  type: {
    type: String,
    require: true
  },
  value: {
    type: Number,
    require: true
  },
  lastModified: {
    type: Date,
    default: Date.now,
  },
});

const gradesModel = mongoose.model('grades', gradesSchemas, 'grades');

export { gradesModel };