import { useDrop } from 'react-dnd';

import { DragItem, ItemTypes } from '../../types';

export interface ColumnProps {
    columnIndex: number;
    label?: string;
    children: React.ReactNode;
    totalItems: number;
    moveCard: (
        dragColumnIndex: number,
        dragIndex: number,
        hoverColumnIndex: number,
        hoverIndex: number,
    ) => void;
}

const Column = ({ columnIndex, children, totalItems, moveCard }: ColumnProps) => {
    const [, drop] = useDrop(
        {
            accept: ItemTypes.KNIGHT,
            drop: () => ({ columnIndex, totalItems }),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
            canDrop: () => {
                return true;
            },
            hover: (item: DragItem) => {
                if (columnIndex !== item.columnIndex) {
                    moveCard(item.columnIndex, item.index, columnIndex, totalItems);
                    item.columnIndex = columnIndex;
                    item.index = totalItems;
                }
            },
        },
        [columnIndex, totalItems, moveCard],
    );

    return (
        <div
            ref={drop as unknown as React.RefObject<HTMLDivElement>}
            style={{
                backgroundColor: '#F2EFE7',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
                padding: 12,
                gap: 6,
            }}
        >
            {children}
        </div>
    );
};

export default Column;
