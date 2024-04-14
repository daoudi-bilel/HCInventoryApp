export interface DevicesPayload {
    content: {
      id: number;
      type: string;
      description: string;
    }[];
    totalItems: number;
    totalPages: number;
    page: number;
    size: number;
  }