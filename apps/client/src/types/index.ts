export interface RequestOptions {
  method: 'get' | 'post' | 'patch' | 'delete' | 'put';
  headers?: {
    'Content-Type': 'application/json';
  };
  credentials: 'include';
  body?: string;
}
