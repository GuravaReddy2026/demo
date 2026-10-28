
export interface Task {
  id: number;
  title: string;
  description: string | null;
  createdAt: string;
}

export interface CreateTaskRequest {
  title: string;
  description: string;
}