import { TaskStatus } from './taskstatus'

export class Task {
  id: number;
  name: string;
  taskStatus: TaskStatus;
  date: Date;
  userId: string;
  category: string;
}
