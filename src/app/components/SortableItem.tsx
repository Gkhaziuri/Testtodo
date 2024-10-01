'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './../styles/SortableTodoList.module.css';

interface SortableItemProps {
  id: string;
  text: string;
  onDelete: (id: string) => void; 
}

const SortableItem: React.FC<SortableItemProps> = ({ id, text, onDelete }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li className={styles.mainButton}>
      <li
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`${styles.listItem} ${isDragging ? styles.listItemDragging : ''}`}
      >
        <span>{text}</span> 
      </li>
      <button
        onClick={() => onDelete(id)}
        className={styles.deleteButton}
      >
        X
      </button>
    </li>
  );
};

export default SortableItem;
