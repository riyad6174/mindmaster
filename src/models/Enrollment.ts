import mongoose, { Schema, model, models } from 'mongoose';

export interface IEnrollment {
  _id: mongoose.Types.ObjectId;
  name: string;
  motherName: string;
  fatherName: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  program: string;
  supportArea: string[];
  learningFormat: string;
  enrollDate: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: Date;
}

const EnrollmentSchema = new Schema<IEnrollment>(
  {
    name:           { type: String, required: true, trim: true },
    motherName:     { type: String, required: true, trim: true },
    fatherName:     { type: String, required: true, trim: true },
    dob:            { type: String, required: true },
    phone:          { type: String, required: true, trim: true },
    email:          { type: String, required: true, trim: true, lowercase: true },
    address:        { type: String, required: true, trim: true },
    program:        { type: String, required: true, trim: true },
    supportArea:    { type: [String], default: [] },
    learningFormat: { type: String, trim: true },
    enrollDate:     { type: String, required: true },
    status:         { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export const Enrollment = models.Enrollment || model<IEnrollment>('Enrollment', EnrollmentSchema);
