export interface EmployeesPayload {
    content: {
      id: number;
      name: string;
      email: string;
    }[];
    totalItems: number;
    totalPages: number;
    page: number;
    size: number;
  }