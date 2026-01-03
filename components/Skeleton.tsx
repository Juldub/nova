
import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className }) => (
  <div className={`animate-pulse bg-slate-800 rounded-lg ${className}`}></div>
);

export const ProjectSkeleton = () => (
  <div className="glass-morphism rounded-3xl overflow-hidden p-0">
    <Skeleton className="aspect-[4/3] rounded-none" />
    <div className="p-8 space-y-4">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-20 w-full" />
    </div>
  </div>
);
