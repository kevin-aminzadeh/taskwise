import { FlatList, Text, View } from 'react-native';

type Todo = {
	id: string;
	title: string;
	description?: string;
	status: 'active' | 'completed';
};

function TodoItem({ todo, className }: { todo: Todo; className?: string }) {
	return (
		<View
			className={`bg-[#2A2A2A] p-6 rounded-xl  w-full flex flex-row items-center justify-start overflow-hidden ${className}`}
		>
			<View className='w-6 h-6 border-slate-400 border-2 rounded-full'></View>

			<View className='w-full flex flex-col pl-6'>
				<Text className='text-white text-lg font-bold line-clamp-1'>
					{todo.title} - {todo.status}
				</Text>
			</View>
		</View>
	);
}

function TodoList({ todos }: { todos: Todo[] }) {
	return (
		<>
			{todos?.length ? (
				<FlatList
					data={todos}
					renderItem={({ item, index }) => (
						<TodoItem todo={item} className={index === 0 ? '' : 'mt-4'} />
					)}
					className='flex flex-col h-full w-full content-center'
					keyExtractor={(item) => item.id}
				/>
			) : (
				<Text className='text-white'>No todos</Text>
			)}
		</>
	);
}

export default TodoList;
