export interface DevicesPayload {
    content: {
      id: number;
      type: string;
      decription: string;
    }[];
    totalItems: number;
    totalPages: number;
    pageNumber: number;
    pageSize: number;
  }