import { FC, useCallback, useState } from 'react';

import Knight from './Knight';
import Square from './Square';

const Board: FC = () => {
    const [pos, setPos] = useState({ x: 0, y: 0 });
    const NUMBER = 8;

    const canDropHandler = useCallback(
        (x: number, y: number) => {
            if (Math.abs(pos.x - x) === 2 || Math.abs(pos.y - y) === 2) {
                return true;
            }
            return false;
        },
        [pos],
    );

    const onDropHandler = useCallback((x: number, y: number) => {
        setPos({
            x,
            y,
        });
    }, []);

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(8, 1fr)',
                gridTemplateRows: 'repeat(8, 1fr)',
                width: '500px',
                aspectRatio: '1 / 1',
                border: '1px solid black',
            }}
        >
            {Array.from({ length: NUMBER }).map((_, i) => {
                return Array.from({ length: NUMBER }).map((_, j) => {
                    const black = (i + j) % 2 === 1;
                    return (
                        <Square
                            key={i * 8 + j}
                            black={black}
                            x={i}
                            y={j}
                            onDropHandler={onDropHandler}
                            canDropHandler={canDropHandler}
                        >
                            {pos.x === i && pos.y === j ? <Knight black={!black} /> : null}
                        </Square>
                    );
                });
            })}
        </div>
    );
};

export default Board;
