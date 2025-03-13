import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { RadialGauge } from '@progress/kendo-react-gauges';
import { MetricsBridge } from '../bridges/metrics-bridge';
import { MetricsTypes } from '../enums/metrics-types';
const MemoryGauge = ({ value: propValue }) => {
    const [value, setValue] = useState(0);
    let subscription;
    useEffect(() => {
        subscription = MetricsBridge(MetricsTypes.MEMORY).subscribe(data => {
            setValue(data.value);
        });
        return () => subscription.unsubscribe();
    }, []);
    const gaugeOptions = {
        value: propValue ?? value,
        scale: {
            max: 100,
            majorUnit: 20,
            minorUnit: 2,
            ranges: [
                { from: 0, to: 40, color: '#28a745' },
                { from: 40, to: 70, color: '#ffc107' },
                { from: 70, to: 100, color: '#dc3545' }
            ]
        },
        pointer: {
            value: propValue ?? value
        }
    };
    return _jsx(RadialGauge, { ...gaugeOptions });
};
/**
 * <h1>{@link MemoryGauge}</h1>
 * gauge to display memory usage
 */
export default MemoryGauge;
//# sourceMappingURL=memory-gauge.js.map