export const ItemTypes = {
    KNIGHT: 'knight',
};

export interface DragItem {
    columnIndex: number;
    index: number;
    name: string;
    canChangeColumn: boolean;
}
