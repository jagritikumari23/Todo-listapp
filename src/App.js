import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useTodos } from './hooks/useTodos';
import { useNotifications } from './services/NotificationService';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import AddTodo from './MyComponents/AddTodo';
import About from './MyComponents/About';
import Login from './MyComponents/Auth/Login';
import Signup from './MyComponents/Auth/Signup';
import PrivateRoute from './MyComponents/Auth/PrivateRoute';
import Footer from './MyComponents/Footer';
import './App.css';

function AppContent() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("darkMode");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { todos, addTodo, deleteTodo, updateTodo } = useTodos();
  
  // Add this line near the top of the component
  useNotifications(todos);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const filteredTodos = todos.filter((todo) => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.desc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || todo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  const completedTodos = todos.filter((todo) => todo.completed).length;
  const progress = todos.length > 0 ? Math.round((completedTodos / todos.length) * 100) : 0;

  const handleToggleComplete = async (todoId) => {
    const todo = todos.find(t => t.id === todoId);
    await updateTodo(todoId, { completed: !todo.completed });
  };

  const handleEditTodo = async (todoId, title, desc, dueDate) => {
    await updateTodo(todoId, { title, desc, dueDate });
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Header 
        title="TaskFlow" 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        darkMode={darkMode}
        toggleTheme={toggleTheme}
        progress={progress}
      />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <>
                <AddTodo addTodo={addTodo} />
                <Todos 
                  todos={sortedTodos} 
                  onDelete={deleteTodo} 
                  onEdit={handleEditTodo}
                  onToggleComplete={handleToggleComplete}
                  selectedCategory={selectedCategory}
                />
              </>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;