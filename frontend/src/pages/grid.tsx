import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Subject, Observable } from 'rxjs';
import { debounceTime, scan } from 'rxjs/operators';
import GridRow from '../components/grid-row';
import './Grid.scss';

interface GridData {
    content: string;
    spanColumns: number;
    spanRows: number;
}

const getGridDataStream = (): Observable<GridData> => {
    return new Observable<GridData>((observer) => {
        const eventSource = new EventSource('/grid'); // SSE endpoint

        eventSource.onmessage = (event: MessageEvent) => {
            observer.next(JSON.parse(event.data));
        };

        eventSource.onerror = (error) => {
            observer.error(error);
            eventSource.close();
        };

        return () => eventSource.close();
    });
};

export interface GridProps {
    columns: number;          // Number of columns in the grid
    gap: string;              // Gap between rows and columns
    className?: string;       // Optional class name for styling
    children?: React.ReactNode; // Include children as valid prop
}

const Grid: React.FC<GridProps> = ({ columns = 3, gap = '1rem', className = '' }) => {
    const [allGridItems, setAllGridItems] = useState<GridData[]>([]);
    const [visibleGridItems, setVisibleGridItems] = useState<GridData[]>([]);
    const [currentBatch, setCurrentBatch] = useState<number>(1);

    const BATCH_SIZE = 100;
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const gridData$ = getGridDataStream().pipe(
            scan((acc: GridData[], newItem: GridData) => [...acc, newItem], []), // Accumulate grid data
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

    const bottomElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (observerRef.current) observerRef.current.disconnect();

            if (node) {
                observerRef.current = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) loadMoreItems();
                });

                observerRef.current.observe(node);
            }
        },
        [loadMoreItems]
    );

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
    };

    return (
        <div className={`grid ${className}`} style={gridStyle}>
            {/* Render visible grid items as rows */}
            {visibleGridItems.map((item, index) => (
                <GridRow key={index} rowData={[item]} />
            ))}
            {/* Lazy loading trigger */}
            <div ref={bottomElementRef} style={{ height: '1px' }} />
        </div>
    );
};

export default Grid;