import { StatusBar } from 'expo-status-bar';
import {
	Button,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from 'react-native-safe-area-context';
import TitleBar from './src/components/core/TitleBar';
import './src/styles/global.css';
import TodoList from './src/components/core/TodoList';

const DUMMY_DATA = [
	{ id: '1', text: 'Learn React Native', status: 'active' },
	{ id: '2', text: 'Learn TypeScript', status: 'active' },
	{ id: '3', text: 'Learn GraphQL', status: 'completed' },
];

function HomeScreen() {
	const safeAreaInsets = useSafeAreaInsets();

	return (
		<View
			className='bg-[#1C1D21] flex-1 justify-between items-between flex flex-col'
			style={{
				paddingTop: safeAreaInsets.top,
			}}
		>
			<StatusBar style='light' />
			<TitleBar title='My Todo List' />

			{/* Main Content */}
			<View className='flex-1 px-8'>
				<TodoList todos={DUMMY_DATA} />
			</View>

			{/* Bottom Nav */}
			<View className='flex flex-row justify-center items-center py-10'>
				<Pressable className='bg-purple-700 px-6 py-3 rounded-full'>
					<Text className='text-white text-xl font-bold tracking-wider'>
						Add New Todo
					</Text>
				</Pressable>
			</View>
		</View>
	);
}

function App() {
	return (
		<SafeAreaProvider>
			<HomeScreen />
		</SafeAreaProvider>
	);
}

export default App;
