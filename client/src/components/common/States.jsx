import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";
export function Loading({ label = "Loading" }) {
  return (
    <div className="state">
      <LoaderCircle className="spin" size={26} />
      <span>{label}</span>
    </div>
  );
}
export function EmptyState({ title, description, action }) {
  return (
    <div className="state empty-state">
      <Inbox size={30} />
      <strong>{title}</strong>
      <span>{description}</span>
      {action}
    </div>
  );
}
export function ErrorState({
  message = "Something went wrong. Please try again.",
}) {
  return (
    <div className="state error-state">
      <AlertCircle size={25} />
      <span>{message}</span>
    </div>
  );
}
