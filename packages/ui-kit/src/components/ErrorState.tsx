interface ErrorStateProps {
  title: string;
  description: string;
  onRetry?: () => void;
}

export function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <section className="ui-state ui-state--error" role="alert">
      <h3>{title}</h3>
      <p>{description}</p>
      {onRetry ? <button onClick={onRetry}>Retry</button> : null}
    </section>
  );
}
