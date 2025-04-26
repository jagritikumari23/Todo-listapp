import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (!currentUser) return;

    const q = query(collection(db, 'todos'), where('userId', '==', currentUser.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const todosData = snapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const addTodo = async (title, desc, category, dueDate) => {
    await addDoc(collection(db, 'todos'), {
      userId: currentUser.uid,
      title,
      desc,
      category: category || "personal",
      dueDate: dueDate || null,
      completed: false,
      createdAt: new Date()
    });
  };

  const deleteTodo = async (todoId) => {
    await deleteDoc(doc(db, 'todos', todoId));
  };

  const updateTodo = async (todoId, updates) => {
    await updateDoc(doc(db, 'todos', todoId), updates);
  };

  return { todos, addTodo, deleteTodo, updateTodo };
}