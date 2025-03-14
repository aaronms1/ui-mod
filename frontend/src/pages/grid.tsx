import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Observable } from 'rxjs';
import { debounceTime, scan } from 'rxjs/operators';
import GridRow from '../components/grid-row';
import { GridColumnName } from '../enums/grid-column-name';
// import '../styles/pages/grid.css';

interface GridData {
    content: string;
    spanColumns: number;
    spanRows: number;
    [key: string]: any; // Allow additional properties for sorting and filtering
}

const getGridDataStream = (): Observable<GridData> => {
    return new Observable<GridData>((observer) => {
        const eventSource = new EventSource('/grid');

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
    columns: number;
    gap: string;
    className?: string;
    children?: React.ReactNode;
}

const Grid: React.FC<GridProps> = ({ columns = 3, gap = '1rem', className = '' }) => {
    const [allGridItems, setAllGridItems] = useState<GridData[]>([]);
    const [visibleGridItems, setVisibleGridItems] = useState<GridData[]>([]);
    const [currentBatch, setCurrentBatch] = useState<number>(1);
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [filterCriteria, setFilterCriteria] = useState<{ [key: string]: any }>({});

    const BATCH_SIZE = 100;
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const gridData$ = getGridDataStream().pipe(
            scan((acc: GridData[], newItem: GridData) => [...acc, newItem], []),
            debounceTime(100)
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
        let filteredItems = [...allGridItems];

        // Apply filtering
        Object.keys(filterCriteria).forEach((key) => {
            filteredItems = filteredItems.filter((item) => item[key] === filterCriteria[key]);
        });

        // Apply sorting
        if (sortColumn) {
            filteredItems.sort((a, b) => {
                if (a[sortColumn] < b[sortColumn]) return sortOrder === 'asc' ? -1 : 1;
                if (a[sortColumn] > b[sortColumn]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
        }

        setVisibleGridItems((prevItems) => [...prevItems, ...filteredItems.slice(startIndex, endIndex)]);
    }, [currentBatch, allGridItems, sortColumn, sortOrder, filterCriteria]);

    const loadMoreItems = useCallback(() => {
        setCurrentBatch((prevBatch) => prevBatch + 1);
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

    const handleSort = (column: string) => {
        if (sortColumn === column) {
            setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const handleFilterChange = (column: string, value: any) => {
        setFilterCriteria((prevCriteria) => ({
            ...prevCriteria,
            [column]: value,
        }));
    };

    const gridStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap,
    };

    const headerRow = Object.values(GridColumnName).map((columnName, index) => (
        <div key={index} className="grid-column-header" onClick={() => handleSort(columnName)}>
            {columnName} {sortColumn === columnName ? (sortOrder === 'asc' ? '↑' : '↓') : ''}
        </div>
    ));

    const filterRow = Object.values(GridColumnName).map((columnName, index) => (
        <div key={index} className="grid-column-filter">
            <input
                type="text"
                placeholder={`Filter by ${columnName}`}
                onChange={(e) => handleFilterChange(columnName, e.target.value)}
            />
        </div>
    ));

    return (
        <div className={`grid ${className}`} style={gridStyle}>
            <div className="grid-row">{headerRow}</div>
            <div className="grid-row">{filterRow}</div>
            {visibleGridItems.map((item, index) => (
                <GridRow key={index} rowData={[item]} />
            ))}
            <div ref={bottomElementRef} style={{ height: '1px' }} />
        </div>
    );
};

export default Grid;