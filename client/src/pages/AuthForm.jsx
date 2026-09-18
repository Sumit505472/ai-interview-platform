import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BrainCircuit,
  LockKeyhole,
  Mail,
  UserRound,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../services/api";
export function AuthForm({ mode, onAuth }) {
  const isLogin = mode === "login";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();
  const submit = async (values) => {
    try {
      const { data } = await api.post(
        `/api/auth/${isLogin ? "login" : "register"}`,
        values,
      );
      onAuth(data.user || data);
      toast.success(isLogin ? "Welcome back" : "Account created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to complete request",
      );
    }
  };
  return (
    <div className="auth-page">
      {" "}
      <div className="auth-aside">
        {" "}
        <Link to="/" className="brand">
          {" "}
          <span className="brand-mark">
            {" "}
            <BrainCircuit size={20} />{" "}
          </span>{" "}
          <span>Prepwise</span>{" "}
        </Link>{" "}
        <div>
          {" "}
          <span className="eyebrow"> The practice advantage </span>{" "}
          <h1> Make your next interview feel like a conversation. </h1>{" "}
          <p>
            {" "}
            Build confidence through focused preparation, one good session at a
            time.{" "}
          </p>{" "}
        </div>{" "}
        <small>© 2026 Prepwise</small>{" "}
      </div>{" "}
      <div className="auth-form-wrap">
        {" "}
        <div className="auth-form">
          {" "}
          <div className="auth-heading">
            {" "}
            <span className="eyebrow">
              {" "}
              {isLogin ? "Welcome back" : "Get started"}{" "}
            </span>{" "}
            <h2>
              {" "}
              {isLogin
                ? "Pick up where you left off."
                : "Your best interview starts here."}{" "}
            </h2>{" "}
            <p>
              {" "}
              {isLogin
                ? "Sign in to continue your preparation."
                : "Create your workspace in less than a minute."}{" "}
            </p>{" "}
          </div>{" "}
          <form onSubmit={handleSubmit(submit)}>
            {" "}
            {!isLogin && (
              <label>
                {" "}
                Name{" "}
                <div className="input-wrap">
                  {" "}
                  <UserRound size={17} />{" "}
                  <input
                    placeholder="Your name"
                    {...register("fullName", { required: true })}
                  />{" "}
                </div>{" "}
                {errors.name && (
                  <small className="field-error"> Name is required </small>
                )}{" "}
              </label>
            )}{" "}
            <label>
              {" "}
              Email{" "}
              <div className="input-wrap">
                {" "}
                <Mail size={17} />{" "}
                <input
                  type="email"
                  placeholder="you@company.com"
                  {...register("email", { required: true })}
                />{" "}
              </div>{" "}
              {errors.email && (
                <small className="field-error"> Email is required </small>
              )}{" "}
            </label>{" "}
            <label>
              {" "}
              Password{" "}
              <div className="input-wrap">
                {" "}
                <LockKeyhole size={17} />{" "}
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: true, minLength: 6 })}
                />{" "}
              </div>{" "}
              {errors.password && (
                <small className="field-error">
                  {" "}
                  Use at least 6 characters{" "}
                </small>
              )}{" "}
            </label>{" "}
            <button
              className="button button-coral full-width"
              disabled={isSubmitting}
            >
              {" "}
              {isSubmitting
                ? "Working..."
                : isLogin
                  ? "Sign in"
                  : "Create account"}{" "}
              <ArrowRight size={17} />{" "}
            </button>{" "}
          </form>{" "}
          <p className="switch-auth">
            {" "}
            {isLogin ? "New to Prepwise?" : "Already have an account?"}{" "}
            <Link to={isLogin ? "/register" : "/login"}>
              {" "}
              {isLogin ? "Create an account" : "Sign in"}{" "}
            </Link>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
