import { Document, Schema, models, model } from "mongoose";

export interface IProject extends Document {
  project_title: string;
  project_description: string;
  project_thumbnail: string;
  project_url: string;
  project_scope: string;
  project_techstack: string[];
  createdAt: Date;
}

const projectSchema = new Schema({
  project_title: {
    type: String,
    required: true,
  },
  project_description: {
    type: String,
    required: true,
  },
  project_thumbnail: {
    type: String,
    required: true,
  },
  project_url: {
    type: String,
    required: true,
  },
  project_scope: {
    type: String,
    required: true,
  },
  project_techstack: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Project =
  models.Project || model<IProject>("Project", projectSchema);
