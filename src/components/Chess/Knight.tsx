import { FC } from 'react';
import { useDrag } from 'react-dnd';
import { FaChessQueen } from 'react-icons/fa';

import { ItemTypes } from '../../types';

interface Props {
    black?: boolean;
}

const Knight: FC<Props> = ({ black }) => {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: ItemTypes.KNIGHT,
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
            item: { type: ItemTypes.KNIGHT },
        }),
        [],
    );

    return (
        <div
            ref={drag as unknown as React.RefObject<HTMLDivElement>}
            style={{
                scale: 1,
                color: black ? 'black' : 'white',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                cursor: 'move',
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <FaChessQueen size={30} />
        </div>
    );
};

export default Knight;
