import { FC, PropsWithChildren } from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from '../../types';

interface Props extends PropsWithChildren {
    black?: boolean;
    x: number;
    y: number;
    onDropHandler?: (x: number, y: number) => void;
    canDropHandler?: (x: number, y: number) => boolean;
}

const Square: FC<Props> = ({ black, children, x, y, onDropHandler, canDropHandler }) => {
    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: ItemTypes.KNIGHT,
            // canDrop is true -> drop is called
            canDrop: () => canDropHandler?.(x, y) ?? false,
            // when canDrop is true, allow the knight to be dropped
            drop: () => onDropHandler?.(x, y),
            // ---
            collect: (monitor) => ({
                // It means that users is dragging a knight over the square
                isOver: !!monitor.isOver(),
                // Determine if the knight can be dropped on the current square
                canDrop: !!monitor.canDrop(),
                item: monitor.getItem(),
            }),
        }),
        [x, y, onDropHandler, canDropHandler],
    );

    const fill = !isOver ? (black ? 'black' : 'white') : 'rgba(255, 255, 0, 0.5)';
    const color = !isOver ? (black ? 'white' : 'black') : 'white';

    // console.log(x, y, isOver, canDrop, item, !isOver && canDrop);

    return (
        <div
            ref={drop as unknown as React.RefObject<HTMLDivElement>}
            style={{
                backgroundColor: fill,
                padding: 20,
                color,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                position: 'relative',
            }}
        >
            {children}
            {!isOver && canDrop && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 255, 0, 0.5)',
                        width: '100%',
                        height: '100%',
                        content: '',
                        zIndex: 100,
                    }}
                />
            )}
        </div>
    );
};

export default Square;
