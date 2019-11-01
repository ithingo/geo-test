export interface AuthResponse {
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    access_token: string;
    expires_in: number;
  }
}
