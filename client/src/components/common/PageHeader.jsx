export function PageHeader({ title, description, action }) {
  return (
    <div className="mb-7 flex flex-col items-start justify-between gap-[18px] md:flex-row md:items-end md:gap-6">
      <div>
        <h2 className="font-display text-2xl leading-[1.15] md:text-[28px]">{title}</h2>
        {description && <p className="mt-2 text-sm leading-[1.6] text-muted">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
