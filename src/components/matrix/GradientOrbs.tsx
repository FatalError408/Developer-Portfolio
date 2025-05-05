
const GradientOrbs = () => {
  return (
    <>
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gradient-radial from-blue-500/25 to-transparent rounded-full filter blur-3xl pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-1/3 -left-24 w-80 h-80 bg-gradient-radial from-purple-500/25 to-transparent rounded-full filter blur-3xl pointer-events-none animate-pulse-slow animation-delay-1500" />
      <div className="absolute top-3/4 left-1/2 w-72 h-72 bg-gradient-radial from-cyan-400/20 to-transparent rounded-full filter blur-3xl pointer-events-none animate-pulse-slow animation-delay-1000" />
    </>
  );
};

export default GradientOrbs;
