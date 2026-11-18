const variantClasses = {
  primary: "border border-transparent bg-navy text-white hover:bg-[#234954]",
  secondary: "border border-transparent bg-[#eaf1ec] text-[#2b604e] hover:bg-[#dce9df]",
  ghost: "border border-[#dce2de] bg-transparent text-ink hover:bg-[#f1f4f1]",
  danger: "border border-transparent bg-[#fbe8e4] text-[#a94438] hover:bg-[#f5d6cf]",
};

export function Button({ variant = "primary", className = "", ...props }) {
  return (
    <button
      className={`inline-flex min-h-10 items-center justify-center rounded-[7px] px-[15px] text-[13px] font-bold transition-colors duration-[180ms] ${variantClasses[variant] || variantClasses.primary} ${className}`.trim()}
      {...props}
    />
  );
}
