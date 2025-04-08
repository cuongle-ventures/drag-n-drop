// https://stackblitz.com/edit/react-dnd-two-columns?file=package.json
import type { Identifier } from 'dnd-core';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import { DragItem, ItemTypes } from '../../types';

interface Props {
    cardInfo: { index: number; name: string };
    index: number;
    columnIndex: number;
    moveCard: (
        dragColumnIndex: number,
        dragIndex: number,
        hoverColumnIndex: number,
        hoverIndex: number,
    ) => void;
}

const Item: FC<Props> = ({ cardInfo, columnIndex, index, moveCard }) => {
    const ref = useRef<HTMLDivElement>(null);

    const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>(
        {
            accept: ItemTypes.KNIGHT,
            hover(item) {
                const dragColumnIndex = item.columnIndex;
                const dragIndex = item.index;

                const hoverIndex = index;
                const hoverColumnIndex = columnIndex;

                if (!ref.current) {
                    return;
                }

                // If item is same as the hovered item, do nothing (1)
                if (hoverIndex === dragIndex && hoverColumnIndex === dragColumnIndex) {
                    return;
                }

                // Determine rectangle on screen
                // const hoverBoundingRect = ref.current.getBoundingClientRect();

                // Get vertical middle
                // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

                // Determine mouse position
                // const clientOffset = monitor.getClientOffset();

                // Get pixels to the top
                // const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                // When dragging upwards, only move when the cursor is above 50%

                // Dragging downwards
                // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                //     return;
                // }

                // Dragging upwards
                // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                //     return;
                // }

                // // current dragged item
                // console.log('--current-dragged-item--', dragColumnIndex, dragIndex);
                // // an item is under the current dragged item
                // console.log('--hover-item--', hoverColumnIndex, hoverIndex);

                // Immediately change drag column index and item index in order to avoid always passing condition (1)
                item.index = hoverIndex;
                item.columnIndex = hoverColumnIndex;

                moveCard(dragColumnIndex, dragIndex, hoverColumnIndex, hoverIndex);
            },
            collect(monitor) {
                return {
                    handlerId: monitor.getHandlerId(),
                };
            },
        },
        [cardInfo, columnIndex, index, moveCard],
    );

    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.KNIGHT,
            item: { columnIndex, index, name: cardInfo.name },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end(draggedItem, monitor) {
                const dropResult = monitor.getDropResult<{
                    columnIndex: number;
                    totalItems: number;
                }>();
                // Because the item's index is modified immediately right after dragging/hovering, so
                // it will not run this code below
                // only run this code when users move item from one column to other column
                const newColumnIndex = dropResult?.columnIndex || 0;
                const newIndex = dropResult?.totalItems ? dropResult.totalItems : 0;
                if (dropResult?.columnIndex !== draggedItem.columnIndex) {
                    moveCard(columnIndex, index, newColumnIndex, newIndex);
                    draggedItem.columnIndex = newColumnIndex;
                    draggedItem.index = newIndex;
                }
            },
        }),
        [cardInfo, columnIndex, index, moveCard],
    );

    const opacityVal = isDragging ? 0.5 : 1;

    const backgroundColor = isDragging ? '#48A6A7' : '#006A71';

    drag(drop(ref));

    return (
        <div
            ref={ref}
            data-handler-id={handlerId}
            style={{
                opacity: opacityVal,
                backgroundColor: backgroundColor,
                padding: 10,
                color: 'white',
                fontSize: 14,
                transition: 'all 0.5s ease',
                cursor: 'move',
            }}
        >
            <div>{cardInfo.name}</div>
        </div>
    );
};

export default Item;
