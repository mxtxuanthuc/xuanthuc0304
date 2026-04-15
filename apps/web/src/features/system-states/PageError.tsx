import { ErrorState } from '@career/ui-kit';

interface PageErrorProps {
  onRetry?: () => void;
}

export function PageError({ onRetry }: PageErrorProps) {
  return <ErrorState title="Error" description="Something went wrong." onRetry={onRetry} />;
}
