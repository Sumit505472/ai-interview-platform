import { AuthForm } from "../AuthForm";
export function Register({ onAuth }) {
  return <AuthForm mode="register" onAuth={onAuth} />;
}
