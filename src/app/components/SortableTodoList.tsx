'use client';

import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import SortableItem from './SortableItem';
import styles from './../styles/SortableTodoList.module.css';

interface Todo {
  id: string;
  text: string;
}

const SortableTodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  console.log(todos)
  
  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const handleDragEnd = (event: DragEndEvent) => { 
    const { active, over } = event;

    if (over && active.id !== over.id) { 
      setTodos((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddTodo = () => {
    
    if (input.trim() === '') { 
      alert("Please write something!");  
      return;  
    }
    const newTodo: Todo = { id: Date.now().toString(), text: input };
    setTodos([...todos, newTodo]);
    setInput('');
    
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };


  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const handleDownloadTodos = () => {
    if (todos.length === 0) {
      alert("Please add a task first!");  
      return;  
    }
    const fileData = JSON.stringify(todos, null, 2); 
    const blob = new Blob([fileData], { type: 'application/json' });
    const url = URL.createObjectURL(blob); 

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'todos.json'); 
    document.body.appendChild(link);
    link.click(); 
    document.body.removeChild(link); 
    
  };
  const handleDeleteAll = () => {
    if (todos.length === 0) {
      alert("No tasks to delete!");
      return;
    } 
    if (window.confirm("Are you sure you want to delete all tasks?")) {
      setTodos([]); 
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.tittleBox}>
        <h2 className={styles.title}>To-Do App</h2>
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="New Task"
          className={styles.input}
        />
        <button onClick={handleAddTodo} className={styles.button}>
          Add
        </button>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={todos.map(todo => todo.id)}
          strategy={verticalListSortingStrategy}
        >
          <ul className={styles.list}>
            {todos.map((todo, index) => (
              <SortableItem
                key={todo.id}
                id={todo.id}
                text={`${index + 1}. ${todo.text}`} 
                onDelete={handleDeleteTodo}
              />
            ))}
          </ul>
        </SortableContext>
      </DndContext>
      <button onClick={handleDownloadTodos} className={styles.downloadButton}>
        Download Tasks
      </button>
      <button onClick={handleDeleteAll} className={styles.deleteAllButton}>
        Delete All
      </button>
    </div>
  );
};

export default SortableTodoList;