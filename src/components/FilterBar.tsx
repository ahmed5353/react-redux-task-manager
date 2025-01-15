import { Badge } from '@/components/ui/badge';
import { Task } from '@/types/types';
import { useSelector } from 'react-redux';

function FilterBar() {
  const tasks = useSelector((state: { tasks: [] }) => state.tasks);

  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      <Badge variant="outline" className="cursor-pointer">
        All ({tasks.length})
      </Badge>
      <Badge variant="destructive" className="cursor-pointer">
        High ({tasks.filter((t: Task) => t.priority === 'High').length}))
      </Badge>
      <Badge variant="default" className="cursor-pointer">
        Medium ({tasks.filter((t: Task) => t.priority === 'Medium').length})
      </Badge>
      <Badge variant="secondary" className="cursor-pointer">
        Low ({tasks.filter((t: Task) => t.priority === 'Low').length})
      </Badge>
    </div>
  );
}

export default FilterBar;
