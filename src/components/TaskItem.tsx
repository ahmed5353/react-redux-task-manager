import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { deleteTask, editTask, toggleTask } from '@/redux/taskSlice';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Task } from '@/types/types';
import { twMerge } from 'tailwind-merge';

function TaskItem({ task }: { task: Task }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedPriority, setEditedPriority] = useState(task.priority);
  const dispatch = useDispatch();

  const handleEdit = () => {
    if (editedTitle.trim()) {
      dispatch(
        editTask({
          ...task,
          title: editedTitle.trim(),
          priority: editedPriority,
        })
      );
      setIsEditing(false);
    }
  };

  const priorityColor = {
    High: 'bg-red-100 border-red-200',
    Medium: 'bg-yellow-100 border-yellow-200',
    Low: 'bg-green-100 border-green-200',
  };

  return (
    <div
      className={twMerge(
        `p-4 rounded-lg border transition-all duration-200 hover:shadow-md`,
        priorityColor[task.priority]
      )}
    >
      {/* <div
      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md`}
    > */}
      {isEditing ? (
        <div className="space-y-2">
          <Input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full"
          />
          <Select
            value={editedPriority}
            onValueChange={(value: 'High' | 'Medium' | 'Low') =>
              setEditedPriority(value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Button onClick={handleEdit} variant="default">
              Save
            </Button>

            <Button onClick={() => setIsEditing(false)} variant="outline">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={() => dispatch(toggleTask(task.id))}
            />
            <span
              className={`${
                task.completed ? 'line-through text-gray-500' : 'text-gray-900'
              }`}
            >
              {task.title}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">
              {task.priority}
            </span>
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
            >
              Edit
            </Button>
            <Button
              onClick={() => dispatch(deleteTask(task.id))}
              variant="destructive"
              size="sm"
            >
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskItem;
