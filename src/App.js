import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import './App.css';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';

function App() {

  const todosList = [
    { id: 1, text: 'تسک های انجام شده' },
    { id: 2, text: 'تسک های تکمیل شده' },
    { id: 3, text: 'تسک های حذف شده' },
  ];

  const [todos, setTodos] = useState([todosList]);

  function deleteTodo(id){
    const newTodos = todos.filter((item)=> {
      return item.id !== id 
    })
    setTodos(newTodos)
    console.log(newTodos)
    }
    
    function addTodo(newTodo){
    setTodos([...todos,newTodo])
    }
    
    function editTodo(id,updatedTodo){
    const updatedItem = todos.map((todo) => {
        return todo.id === id ? updatedTodo : todo;
      });
    setTodos(updatedItem)
    }

    function todoDone(id) {
    const newTodos = todos.filter((item) => {
        return item.id !== id;
    });
    setTodos(newTodos);
    console.log(newTodos);
}

  
   
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />

          <VStack p={5}>
    
    <Text bgGradient="linear(to-l, #7928CA,#FF0080)"
      bgClip="text"
      fontSize="4xl"
      fontWeight="extrabold">
      Todo-Chakra UI
    </Text>
       
    <TodoList 
    todos={todos} 
    deleteTodo={deleteTodo} 
    editTodo={editTodo}
    todoDone={todoDone}/>

    <AddTodo addTodo={addTodo}/>

    
    </VStack>

          
        </Grid>
      </Box>
    </ChakraProvider>
  );
}


export default App;
