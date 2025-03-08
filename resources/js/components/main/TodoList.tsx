import { TYPE_TODO } from '@/types/types';
import CardTodo from '../cards/CardTodo';

const TodoList = ({ label, todos, borderClass }: { label: string; todos: TYPE_TODO[]; borderClass: string }) => (
    <div>
        <div className={`border-b-4 pb-4 ${borderClass}`}>
            <h2>{label}</h2>
        </div>
        <div className="mt-6 space-y-4">
            {todos.length > 0 ? todos.map((todo) => <CardTodo key={todo.id} {...todo} />) : <p>Tidak ada todo prioritas {label.toLowerCase()}.</p>}
        </div>
    </div>
);

export default TodoList;
