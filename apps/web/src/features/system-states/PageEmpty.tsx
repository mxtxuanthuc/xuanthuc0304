import { EmptyState } from '@career/ui-kit';

interface PageEmptyProps {
  title: string;
  description: string;
}

export function PageEmpty({ title, description }: PageEmptyProps) {
  return <EmptyState title={title} description={description} />;
}
