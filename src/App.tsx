import React from 'react';
import LiquidEther from './components/LiquidEther';

function App() {
  return (
    <>
      <LiquidEther
        colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
        mouseForce={20}
        cursorSize={100}
        isViscous={false}
        viscous={30}
        iterationsViscous={32}
        iterationsPoisson={32}
        resolution={0.5}
        isBounce={false}
        autoDemo={true}
        autoSpeed={0.5}
        autoIntensity={2.2}
        takeoverDuration={0.25}
        autoResumeDelay={3000}
        autoRampDuration={0.6}
      />
      <div className="min-h-screen flex items-center justify-center relative z-10">
        {/* ...your main content here... */}
        <p>Start prompting (or editing) to see magic happen :)</p>
      </div>
    </>
  );
}

export default App;