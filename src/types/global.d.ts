interface Task {
  createdAt: number;
  updatedAt: number;
  completedAt?: number;
  id: string;
  title: string;
  description?: string;
  status: "active" | "completed";
}

interface Tasks {
  [key: string]: Task;
}
