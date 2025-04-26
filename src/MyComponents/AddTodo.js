import React, { useState } from 'react';

const AddTodo = ({ addTodo }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("personal");
  const [dueDate, setDueDate] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    addTodo(title, desc, category, dueDate);
    setTitle("");
    setDesc("");
    setDueDate("");
  };

  return (
    <div className="container my-3">
      <h3 className="text-center">Add a Todo</h3>
      <form onSubmit={submit} className="row g-3">
        <div className="col-12 col-md-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            placeholder="Todo Title"
            required
          />
        </div>
        
        <div className="col-12 col-md-6">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="personal">Personal</option>
            <option value="work">Work</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className="form-control"
            placeholder="Todo Description"
            rows="2"
          />
        </div>

        <div className="col-12 col-md-6">
          <input
            type="date"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="col-12 text-center">
          <button type="submit" className="btn btn-success btn-lg">
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;