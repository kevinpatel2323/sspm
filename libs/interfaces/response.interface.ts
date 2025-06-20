export interface ApiResponse<T> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  metadata?: {
    page?: number;
    limit?: number;
    results?: number;
    total?: number;
  };
}

export interface ApiErrorResponse {
  status: 'error';
  message: string;
  timestamp: string;
  path?: string;
  errors?: Array<{
    field?: string;
    message: string;
  }>;
  stack?: string;
}
