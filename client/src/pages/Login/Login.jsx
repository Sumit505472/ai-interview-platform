import { AuthForm } from "../AuthForm";
export function Login({ onAuth }) {
  return <AuthForm mode="login" onAuth={onAuth} />;
}
