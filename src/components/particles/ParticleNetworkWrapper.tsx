
import { Suspense, lazy } from 'react';

const ParticleNetwork = lazy(() => import('./ParticleNetwork'));

interface ParticleNetworkWrapperProps {
  particleCount?: number;
  connectionDistance?: number;
  mouseRadius?: number;
  colors?: string[];
  className?: string;
}

const ParticleNetworkWrapper = (props: ParticleNetworkWrapperProps) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <Suspense fallback={null}>
        <ParticleNetwork {...props} />
      </Suspense>
    </div>
  );
};

export default ParticleNetworkWrapper;
