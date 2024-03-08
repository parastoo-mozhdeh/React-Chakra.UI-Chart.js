import { Stack, Input,Button,useToast } from '@chakra-ui/react'
import React, {useState} from 'react'
import { nanoid } from 'nanoid';



function AddTodo({ addTodo }) {
const toast = useToast()
const [value, setValue] = useState("")

function handleSubmit(e){
    e.preventDefault();

if(value === ''){
    toast({
        title: "لطفا متن خود را وارد کنید..",
        status: "warning",
        duration: 2000,
        isClosable: true,
      })
      return;
    }
const todo = {
    id: nanoid(),
    text: value
}

addTodo(todo)
setValue('')

}
    return (
        <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
            <Input
            mt={5} 
            value={value} 
            variant="outline" 
            type="text" 
            placeholder="اضافه کردن تسک"
            onChange={(e)=>setValue(e.target.value)} />
            <Button colorScheme="teal" type="submit">تسک اضافه کنید</Button>
        </Stack>
        </form>
        
    )
}

export default AddTodo