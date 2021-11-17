export default interface IUser {
  id?: number;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  created_at?: string;
  updated_at?: string;
}
