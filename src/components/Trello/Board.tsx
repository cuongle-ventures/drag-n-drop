import { useState } from 'react';

import Column from './Column';
import Item from './Item';

const Board = () => {
    const [columns, setColumns] = useState<Array<Array<{ index: number; name: string }>>>([
        [
            {
                index: 0,
                name: 'Name',
            },
            {
                index: 1,
                name: 'Age',
            },
            {
                index: 2,
                name: 'Gender',
            },
        ],
        [
            {
                index: 0,
                name: 'Profession',
            },
            {
                index: 1,
                name: 'Location',
            },
            {
                index: 2,
                name: 'Hobbies',
            },
        ],
    ]);

    const moveCard = (
        dragColumnIndex: number,
        dragIndex: number,
        hoverColumnIndex: number,
        hoverIndex: number,
    ) => {
        const dragItem = columns[dragColumnIndex][dragIndex];
        const hoverItem = columns[hoverColumnIndex][hoverIndex];

        if (dragColumnIndex === hoverColumnIndex) {
            // Remove dragged item from the original column & replace it with the hovered item
            columns[dragColumnIndex].splice(dragIndex, 1, hoverItem);
            // Remove hovered item from the original column & replace it with the dragged item
            columns[hoverColumnIndex].splice(hoverIndex, 1, dragItem);
            setColumns([...columns]);
        } else {
            // Remove dragged item from the original column
            columns[dragColumnIndex].splice(dragIndex, 1);
            // Add dragged item to the new column
            columns[hoverColumnIndex].splice(hoverIndex, 0, dragItem);
            setColumns([...columns]);
        }
    };

    console.log('columns', columns);

    return (
        <div
            style={{
                display: 'grid',
                width: 500,
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 20,
                height: 400,
            }}
        >
            <Column columnIndex={0} totalItems={columns[0].length} moveCard={moveCard}>
                {columns[0].map((item, index) => (
                    <Item
                        index={index}
                        key={index}
                        cardInfo={{ index: index, name: item.name }}
                        columnIndex={0}
                        moveCard={moveCard}
                    />
                ))}
            </Column>
            <Column columnIndex={1} totalItems={columns[1].length} moveCard={moveCard}>
                {columns[1].map((item, index) => (
                    <Item
                        index={index}
                        key={index}
                        cardInfo={{ index: index, name: item.name }}
                        columnIndex={1}
                        moveCard={moveCard}
                    />
                ))}
            </Column>
        </div>
    );
};

export default Board;
