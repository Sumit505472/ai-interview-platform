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
      onAuth?.(data.user || data);
      toast.success(isLogin ? "Welcome back" : "Account created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to complete request",
      );
    }
  };
  return (
    <div className="flex min-h-screen">
      {" "}
      <div className="hidden w-[47%] flex-col justify-between bg-navy px-[9%] py-[33px] text-white min-[801px]:flex">
        {" "}
        <Link to="/" className="flex self-start items-center gap-2.5 font-display text-[17px] font-extrabold text-white">
          {" "}
          <span className="inline-flex size-[34px] items-center justify-center rounded-[9px] bg-coral text-white">
            {" "}
            <BrainCircuit size={20} />{" "}
          </span>{" "}
          <span>Prepwise</span>{" "}
        </Link>{" "}
        <div>
          {" "}
          <span className="inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.04em] text-[#9ab0b1] uppercase"> The practice advantage </span>{" "}
          <h1 className="my-[18px] max-w-[470px] font-display text-[45px] leading-[1.12] tracking-[-0.06em]"> Make your next interview feel like a conversation. </h1>{" "}
          <p className="max-w-[390px] text-[15px] leading-[1.7] text-[#b5c7c6]">
            {" "}
            Build confidence through focused preparation, one good session at a
            time.{" "}
          </p>{" "}
        </div>{" "}
        <small className="font-mono text-[10px] text-[#719095]">© 2026 Prepwise</small>{" "}
      </div>{" "}
      <div className="flex w-full items-center justify-center px-[30px] py-[30px] min-[801px]:w-[53%]">
        {" "}
        <div className="w-full max-w-[380px]">
          {" "}
          <div>
            {" "}
            <span className="inline-flex items-center gap-[7px] font-mono text-[11px] tracking-[0.04em] text-muted uppercase">
              {" "}
              {isLogin ? "Welcome back" : "Get started"}{" "}
            </span>{" "}
            <h2 className="my-[12px] mb-[9px] font-display text-[29px] leading-[1.2] tracking-[-0.05em]">
              {" "}
              {isLogin
                ? "Pick up where you left off."
                : "Your best interview starts here."}{" "}
            </h2>{" "}
            <p className="text-sm text-muted">
              {" "}
              {isLogin
                ? "Sign in to continue your preparation."
                : "Create your workspace in less than a minute."}{" "}
            </p>{" "}
          </div>{" "}
          <form className="mt-[35px] grid gap-[17px]" onSubmit={handleSubmit(submit)}>
            {" "}
            {!isLogin && (
              <label className="text-xs font-bold text-[#55646a]">
                {" "}
                Name{" "}
                <div className="mt-[7px] flex items-center gap-2.5 border border-line px-3 py-3 text-[#96a0a0] focus-within:border-coral">
                  {" "}
                  <UserRound size={17} />{" "}
                  <input
                    className="w-full border-0 bg-transparent text-[13px] text-ink outline-none"
                    placeholder="Your name"
                    {...register("fullName", { required: true })}
                  />{" "}
                </div>{" "}
                {errors.fullName && (
                  <small className="mt-1 block text-[10px] text-[#c05546]"> Name is required </small>
                )}{" "}
              </label>
            )}{" "}
            <label className="text-xs font-bold text-[#55646a]">
              {" "}
              Email{" "}
              <div className="mt-[7px] flex items-center gap-2.5 border border-line px-3 py-3 text-[#96a0a0] focus-within:border-coral">
                {" "}
                <Mail size={17} />{" "}
                <input
                  className="w-full border-0 bg-transparent text-[13px] text-ink outline-none"
                  type="email"
                  placeholder="you@company.com"
                  {...register("email", { required: true })}
                />{" "}
              </div>{" "}
              {errors.email && (
                <small className="mt-1 block text-[10px] text-[#c05546]"> Email is required </small>
              )}{" "}
            </label>{" "}
            <label className="text-xs font-bold text-[#55646a]">
              {" "}
              Password{" "}
              <div className="mt-[7px] flex items-center gap-2.5 border border-line px-3 py-3 text-[#96a0a0] focus-within:border-coral">
                {" "}
                <LockKeyhole size={17} />{" "}
                <input
                  className="w-full border-0 bg-transparent text-[13px] text-ink outline-none"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: true, minLength: 6 })}
                />{" "}
              </div>{" "}
              {errors.password && (
                <small className="mt-1 block text-[10px] text-[#c05546]">
                  {" "}
                  Use at least 6 characters{" "}
                </small>
              )}{" "}
            </label>{" "}
            <button
              className="inline-flex w-full items-center justify-center gap-2 rounded-[7px] bg-coral px-4 py-3 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#dc5c42] disabled:opacity-60"
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
          <p className="mt-[25px] text-center text-xs text-muted">
            {" "}
            {isLogin ? "New to Prepwise?" : "Already have an account?"}{" "}
            <Link className="font-bold text-coral" to={isLogin ? "/register" : "/login"}>
              {" "}
              {isLogin ? "Create an account" : "Sign in"}{" "}
            </Link>{" "}
          </p>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
