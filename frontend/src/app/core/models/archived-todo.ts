export interface ArchivedToDo {
  id: string;
  description: string;
  creationDate: string;
  status: ToDoStatus;
  resolvedDate: string;
  expiredDate: string;
}


export enum ToDoStatus {
  RESOLVED = "RESOLVED",
  EXPIRED = "EXPIRED"
}
