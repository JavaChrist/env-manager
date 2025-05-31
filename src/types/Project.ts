export interface Project {
  id: string;
  name: string;
  description?: string;
  envVariables: string;
  readme: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: string[];
}

export interface CreateProjectData {
  name: string;
  description?: string;
  envVariables: string;
  readme: string;
  tags?: string[];
}

export interface UpdateProjectData extends Partial<CreateProjectData> {
  updatedAt: Date;
} 