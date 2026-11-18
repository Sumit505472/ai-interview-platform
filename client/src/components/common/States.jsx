import { AlertCircle, Inbox, LoaderCircle } from "lucide-react";
export function Loading({ label = "Loading" }) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2.5 text-center text-[13px] text-muted">
      <LoaderCircle className="animate-spin text-coral" size={26} />
      <span>{label}</span>
    </div>
  );
}
export function EmptyState({ title, description, action }) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2.5 text-center text-[13px] text-muted">
      <Inbox className="text-coral" size={30} />
      <strong className="text-base font-bold text-ink">{title}</strong>
      <span className="max-w-[300px]">{description}</span>
      {action}
    </div>
  );
}
export function ErrorState({
  message = "Something went wrong. Please try again.",
}) {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2.5 text-center text-[13px] text-[#bd5040]">
      <AlertCircle size={25} />
      <span>{message}</span>
    </div>
  );
}
