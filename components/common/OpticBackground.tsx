import React from 'react';

// animated background with spread-out fluid liquid gradients and transparent engineering grid
export const OpticBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
      {/* soft ambient center veil */}
      <div className="absolute top-[80px] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[360px] bg-[radial-gradient(ellipse_at_center,rgba(159,232,112,0.22)_0%,rgba(205,255,173,0.12)_50%,transparent_75%)] blur-[70px] animate-liquid-pulse" />

      {/* liquid flow - spread to upper-left (tuned ~20% deeper lime) */}
      <div className="absolute -top-[120px] -left-[180px] sm:-left-[100px] w-[750px] sm:w-[950px] h-[600px] bg-[radial-gradient(circle_at_45%_45%,rgba(159,232,112,0.52)_0%,rgba(187,243,147,0.36)_35%,rgba(205,255,173,0.18)_65%,transparent_80%)] blur-[64px] sm:blur-[74px] animate-liquid-left" />

      {/* liquid flow - spread to upper-right (tuned ~20% deeper chartreuse) */}
      <div className="absolute -top-[100px] -right-[180px] sm:-right-[100px] w-[770px] sm:w-[970px] h-[600px] bg-[radial-gradient(circle_at_55%_45%,rgba(168,236,120,0.48)_0%,rgba(197,247,155,0.32)_38%,rgba(214,250,180,0.16)_65%,transparent_80%)] blur-[64px] sm:blur-[74px] animate-liquid-right" />

      {/* liquid stream - spread to mid-left */}
      <div
        className="absolute top-[280px] -left-[220px] sm:-left-[140px] w-[660px] sm:w-[840px] h-[540px] bg-[radial-gradient(circle_at_50%_45%,rgba(145,232,100,0.40)_0%,rgba(187,243,147,0.24)_40%,transparent_75%)] blur-[68px] sm:blur-[78px] animate-liquid-left"
        style={{ animationDelay: '-6s' }}
      />

      {/* liquid stream - spread to mid-right */}
      <div
        className="absolute top-[300px] -right-[220px] sm:-right-[140px] w-[680px] sm:w-[860px] h-[540px] bg-[radial-gradient(circle_at_50%_45%,rgba(159,232,112,0.40)_0%,rgba(205,255,173,0.24)_40%,transparent_75%)] blur-[68px] sm:blur-[78px] animate-liquid-right"
        style={{ animationDelay: '-4.5s' }}
      />

      {/* delicate transparent engineering grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(14,15,12,0.022)_1px,transparent_1px),linear-gradient(to_bottom,rgba(14,15,12,0.022)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_90%_70%_at_50%_25%,#000_40%,transparent_90%)]" />
    </div>
  );
};

export default OpticBackground;
