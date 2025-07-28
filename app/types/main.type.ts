export interface loginResponse {
  message: string;
  user: {
    user_id: string;
    name: string;
    no_induk: string;
    email: string;
    role: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
  token: string;
}
