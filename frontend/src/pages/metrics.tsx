import React, { useState } from 'react';
// import client from "../bridges/connection-factory";
import GpuGauge from '../components/gpu-gauge';
import CpuGauge from '../components/cpu-gauge';
import MemoryGauge from '../components/memory-gauge';
import DiskGauge from '../components/disk-gauge';
import NetworkGauge from '../components/network-gauge';

// export const configs: ViewConfig = {
//   menu: { order: 7, icon: 'line-awesome/svg/chart-line-solid.svg', title: 'Metrics' },
// };

const MetricsView: React.FC = () => {
  const [showGpu, setShowGpu] = useState(true);
  const [showCpu, setShowCpu] = useState(true);
  const [showMemory, setShowMemory] = useState(true);
  const [showDisk, setShowDisk] = useState(true);
  const [showNetwork, setShowNetwork] = useState(true);

  return (
    <div className="flex flex-col h-full items-center justify-center p-l text-center box-border">
      <h1>Server Metrics</h1>
      <div className="grid grid-cols-2 gap-4">
        {showGpu && (
          <div>
            <button onClick={() => setShowGpu(false)}>x</button>
            <GpuGauge />
          </div>
        )}
        {showCpu && (
          <div>
            <button onClick={() => setShowCpu(false)}>x</button>
            <CpuGauge />
          </div>
        )}
        {showMemory && (
          <div>
            <button onClick={() => setShowMemory(false)}>x</button>
            <MemoryGauge />
          </div>
        )}
        {showDisk && (
          <div>
            <button onClick={() => setShowDisk(false)}>x</button>
            <DiskGauge />
          </div>
        )}
        {showNetwork && (
          <div>
            <button onClick={() => setShowNetwork(false)}>x</button>
            <NetworkGauge />
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsView;
