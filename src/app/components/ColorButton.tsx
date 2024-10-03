'use client';

import React, { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, arrayMove, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { SortableContainerWrapper } from './SortableContainerWrapper';
import styles from './../styles/ColorButton.module.css';

const ColorButton: React.FC = () => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [openContainers, setOpenContainers] = useState<string[]>([]);

  const colors = ['#1f2937', '#770303', '#696565'];

  const sensors = useSensors(useSensor(PointerSensor));

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const selectColor = (color: string) => {
    if (!selectedColors.includes(color)) {
      setSelectedColors([...selectedColors, color]);
      setOpenContainers([...openContainers, color]);
    }
    setDropdownOpen(false);
  };

  const removeColor = (color: string) => {
    setSelectedColors(selectedColors.filter(c => c !== color));
    setOpenContainers(openContainers.filter(c => c !== color));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setOpenContainers((items) => {
        const oldIndex = items.findIndex(item => item === active.id);
        const newIndex = items.findIndex(item => item === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button className={styles.ColorButton} onClick={toggleDropdown}>
        +
      </button>
      {dropdownOpen && (
        <div className={styles.dropdown}>
          {colors.map(color => (
            <div
              key={color}
              className={styles.colorOption}
              onClick={() => selectColor(color)}
              style={{
                backgroundColor: color,
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                margin: '5px',
              }}
            />
          ))}
        </div>
      )}

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={openContainers} strategy={verticalListSortingStrategy}>
          {openContainers.map(color => (
            <SortableContainerWrapper
              key={color}
              id={color}
              containerColor={color}
              onClose={() => removeColor(color)}
            />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default ColorButton;