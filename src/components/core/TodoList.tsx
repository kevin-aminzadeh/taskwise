import { FlatList, Text } from 'react-native';

type Todo = {
	id: string;
	text: string;
	status: 'active' | 'completed';
};

function TodoItem({ todo }: { todo: Todo }) {
	return (
		<Text className='text-white'>
			{todo.text} - {todo.status}
		</Text>
	);
}

function TodoList({ todos }: { todos: Todo[] }) {
	return (
		<>
			{todos?.length ? (
				<FlatList
					data={todos}
					renderItem={({ item }) => <TodoItem todo={item} />}
					className='flex flex-col'
					keyExtractor={(item) => item.id}
				/>
			) : (
				<Text className='text-white'>No todos</Text>
			)}
		</>
	);
}

export default TodoList;
