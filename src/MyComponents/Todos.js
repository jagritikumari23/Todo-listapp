import React from 'react';
import TodoItem from './TodoItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Todos = ({ todos, onDelete, onEdit, onToggleComplete }) => {
  const onDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(props.todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    props.reorderTodos(items);
  };

  return (
    <div className="container">
      <h3 className="text-center my-3">Todos List</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {todos.length === 0 ? "No Todos to display" :
                todos.map((todo, index) => (
                  <Draggable 
                    key={todo.id} // Changed from todo.sno to todo.id
                    draggableId={todo.id.toString()} // Changed from todo.sno to todo.id
                    index={index}
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <TodoItem 
                          todo={todo} 
                          onDelete={onDelete}
                          onEdit={onEdit}
                          onToggleComplete={onToggleComplete}
                        />
                      </div>
                    )}
                  </Draggable>
                ))
              }
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Todos;