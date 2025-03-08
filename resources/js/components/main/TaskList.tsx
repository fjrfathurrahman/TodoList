import { TYPE_TASK } from '@/types/types';

const TaskList = ({ label, tasks, borderClass }: { label: string; tasks: TYPE_TASK[]; borderClass: string }) => {
    return (
        <div>
            <div className={`border-b-4 pb-4 ${borderClass}`}>
                <h2>{label}</h2>
            </div>
            <div className="mt-6 space-y-4">
                {tasks.length > 0 ? tasks.map((todo) => <div>{todo.title}</div>) : <p>Tidak ada task status {label.toLowerCase()}.</p>}
            </div>
        </div>
    );
};

export default TaskList;
