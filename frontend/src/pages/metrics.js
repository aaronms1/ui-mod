import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
// import client from "../bridges/connection-factory";
import GpuGauge from '../components/gpu-gauge';
import CpuGauge from '../components/cpu-gauge';
import MemoryGauge from '../components/memory-gauge';
import DiskGauge from '../components/disk-gauge';
import NetworkGauge from '../components/network-gauge';
// export const config: ViewConfig = {
//   menu: { order: 7, icon: 'line-awesome/svg/chart-line-solid.svg', title: 'Metrics' },
// };
const MetricsView = () => {
    const [showGpu, setShowGpu] = useState(true);
    const [showCpu, setShowCpu] = useState(true);
    const [showMemory, setShowMemory] = useState(true);
    const [showDisk, setShowDisk] = useState(true);
    const [showNetwork, setShowNetwork] = useState(true);
    return (_jsxs("div", { className: "flex flex-col h-full items-center justify-center p-l text-center box-border", children: [_jsx("h1", { children: "Server Metrics" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [showGpu && (_jsxs("div", { children: [_jsx("button", { onClick: () => setShowGpu(false), children: "x" }), _jsx(GpuGauge, {})] })), showCpu && (_jsxs("div", { children: [_jsx("button", { onClick: () => setShowCpu(false), children: "x" }), _jsx(CpuGauge, {})] })), showMemory && (_jsxs("div", { children: [_jsx("button", { onClick: () => setShowMemory(false), children: "x" }), _jsx(MemoryGauge, {})] })), showDisk && (_jsxs("div", { children: [_jsx("button", { onClick: () => setShowDisk(false), children: "x" }), _jsx(DiskGauge, {})] })), showNetwork && (_jsxs("div", { children: [_jsx("button", { onClick: () => setShowNetwork(false), children: "x" }), _jsx(NetworkGauge, {})] }))] })] }));
};
export default MetricsView;
//# sourceMappingURL=metrics.js.map