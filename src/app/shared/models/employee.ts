export interface Employee {
    id: number;
    name: string;
    email: string;
    devices?:[
      {
        id: number;
        type: string;
        decription: string;
      }
    ]
  }
  