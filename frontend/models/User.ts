interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
    createdAt?: string;
    updatedAt?: string;
    lastLogin?: string;
    preferences?: {
      theme?: 'light' | 'dark' | 'system';
      notifications?: boolean;
    };
  }
  
  export default User;