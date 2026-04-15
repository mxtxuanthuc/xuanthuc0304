import { Skeleton } from '@career/ui-kit';

export function PageLoading() {
  return (
    <div className="page-state">
      <Skeleton height={28} />
      <Skeleton height={20} />
      <Skeleton height={20} />
    </div>
  );
}
