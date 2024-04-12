import { Document, Schema, model, models } from "mongoose";

export interface IExperience extends Document {
  start_date: string;
  end_date: string;
  title: string;
  institute: string;
  description: string;
  technologies: string[];
  createdAt: Date;
}

const experienceSchema = new Schema({
  start_date: {
    type: String,
    required: true,
  },
  end_date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  technologies: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Experience =
  models.Experience || model<IExperience>("Experience", experienceSchema);
