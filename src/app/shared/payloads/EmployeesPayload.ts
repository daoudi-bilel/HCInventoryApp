export interface EmployeesPayload {
    content: {
      id: number;
      name: string;
      email: string;
    }[];
    totalItems: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
  }