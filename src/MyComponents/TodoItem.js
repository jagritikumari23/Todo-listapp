import React, { useState } from 'react';

const TodoItem = ({todo, onDelete, onEdit, onToggleComplete}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDesc, setEditDesc] = useState(todo.desc);
  const [editDueDate, setEditDueDate] = useState(todo.dueDate || '');

  const handleEdit = () => {
    onEdit(todo.id, editTitle, editDesc, editDueDate); // Changed from todo.sno to todo.id
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(todo.id); // Changed from passing todo object to passing todo.id
  };

  const handleToggle = () => {
    onToggleComplete(todo.id); // Changed from todo.sno to todo.id
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getCategoryBadgeColor = (category) => {
    switch(category) {
      case 'work': return 'bg-primary';
      case 'urgent': return 'bg-danger';
      case 'personal': return 'bg-success';
      default: return 'bg-secondary';
    }
  };

  return (
    <div className={`card my-2 shadow-sm ${todo.completed ? 'border-success' : ''}`}>
      <div className="card-body">
        {!isEditing ? (
          <>
            <div className="todo-header d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2">
              <div className="d-flex align-items-center mb-2 mb-sm-0">
                <input
                  type="checkbox"
                  className="form-check-input me-3"
                  checked={todo.completed}
                  onChange={handleToggle}
                />
                <h4 className={`card-title mb-0 ${todo.completed ? 'text-decoration-line-through' : ''}`}>
                  {todo.title}
                </h4>
              </div>
              <div className="badge-container">
                <span className={`badge ${getCategoryBadgeColor(todo.category)} me-2`}>
                  {todo.category}
                </span>
                {todo.dueDate && (
                  <span className="badge bg-info">
                    Due: {formatDate(todo.dueDate)}
                  </span>
                )}
              </div>
            </div>
            <p className={`card-text ${todo.completed ? 'text-decoration-line-through' : ''}`}>
              {todo.desc}
            </p>
            <div className="btn-group w-100 w-sm-auto">
              <button className="btn btn-sm btn-primary" onClick={() => setIsEditing(true)}>
                Edit
              </button>
              <button className="btn btn-sm btn-danger" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); handleEdit(); }}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control mb-2"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Title"
              />
            </div>
            <div className="mb-3">
              <textarea
                className="form-control mb-2"
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
                placeholder="Description"
                rows="2"
              />
            </div>
            <div className="mb-3">
              <input
                type="date"
                className="form-control mb-2"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
            </div>
            <div className="d-flex flex-column flex-sm-row gap-2">
              <button type="submit" className="btn btn-sm btn-success">
                Save
              </button>
              <button
                type="button"
                className="btn btn-sm btn-secondary"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default TodoItem;