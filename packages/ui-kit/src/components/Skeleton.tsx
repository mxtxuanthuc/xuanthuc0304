interface SkeletonProps {
  height?: number;
}

export function Skeleton({ height = 16 }: SkeletonProps) {
  return <div className="ui-skeleton" style={{ height }} aria-hidden="true" />;
}
