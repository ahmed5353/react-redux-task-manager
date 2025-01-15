import { Task } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToLocalStorage = (tasks: []) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: loadTasksFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasksToLocalStorage(state);
    },
    editTask: (state, action) => {
      const index = state.findIndex(
        (task: Task) => task.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
        saveTasksToLocalStorage(state);
      }
    },
    deleteTask: (state, action) => {
      const newState = state.filter((task: Task) => task.id !== action.payload);
      saveTasksToLocalStorage(newState);
      return newState;
    },
    toggleTask: (state, action) => {
      const task = state.find((task: Task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state);
      }
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTask } = taskSlice.actions;
export default taskSlice.reducer;
