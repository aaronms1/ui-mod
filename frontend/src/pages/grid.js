import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState, useRef, useCallback } from 'react';
import { Observable } from 'rxjs';
import { debounceTime, scan } from 'rxjs/operators';
import GridRow from '../components/grid-row';
import './Grid.scss';
const getGridDataStream = () => {
    return new Observable((observer) => {
        const eventSource = new EventSource('/grid'); // SSE endpoint
        eventSource.onmessage = (event) => {
            observer.next(JSON.parse(event.data));
        };
        eventSource.onerror = (error) => {
            observer.error(error);
            eventSource.close();
        };
        return () => eventSource.close();
    });
};
const Grid = ({ columns = 3, gap = '1rem', className = '' }) => {
    const [allGridItems, setAllGridItems] = useState([]);
    const [visibleGridItems, setVisibleGridItems] = useState([]);
    const [currentBatch, setCurrentBatch] = useState(1);
    const BATCH_SIZE = 100;
    const observerRef = useRef(null);
    useEffect(() => {
        const gridData$ = getGridDataStream().pipe(scan((acc, newItem) => [...acc, newItem], []), // Accumulate grid data
        debounceTime(100) // Debounce rapid updates
        );
        const subscription = gridData$.subscribe({
            next: (items) => setAllGridItems(items),
            error: (error) => console.error('Error in grid data stream:', error),
        });
        return () => subscription.unsubscribe();
    }, []);
    useEffect(() => {
        const startIndex = (currentBatch - 1) * BATCH_SIZE;
        const endIndex = currentBatch * BATCH_SIZE;
        setVisibleGridItems((prevItems) => [...prevItems, ...allGridItems.slice(startIndex, endIndex)]);
    }, [currentBatch, allGridItems]);
    const loadMoreItems = useCallback(() => {
        setCurrentBatch((prevBatch) => prevBatch + 1); // Load more items
    }, []);
    const bottomElementRef = useCallback((node) => {
        if (observerRef.current)
            observerRef.current.disconnect();
        if (node) {
            observerRef.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting)
                    loadMoreItems();
            });
            observerRef.current.observe(node);
        }
    }, [loadMoreItems]);
    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
    };
    return (_jsxs("div", { className: `grid ${className}`, style: gridStyle, children: [visibleGridItems.map((item, index) => (_jsx(GridRow, { rowData: [item] }, index))), _jsx("div", { ref: bottomElementRef, style: { height: '1px' } })] }));
};
export default Grid;
//# sourceMappingURL=grid.js.map