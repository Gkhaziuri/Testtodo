'use client';

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SortableTodoList from './SortableTodoList';
import styles from './../styles/SortableTodoList.module.css';

interface SortableContainerWrapperProps {
  id: string;
  containerColor: string;
  onClose: () => void;
}

export const SortableContainerWrapper: React.FC<SortableContainerWrapperProps> = ({ id, containerColor, onClose }) => {
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
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={styles.container}
    >
      <div className={styles.tittleBox} {...listeners}>
        <h2 className={styles.title}>To-Do List</h2>
      </div>
      <SortableTodoList containerColor={containerColor} onClose={onClose} />
    </div>
  );
};
