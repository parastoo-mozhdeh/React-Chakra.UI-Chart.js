import {
  HStack,
  VStack,
  Text,
  Flex,
  Badge,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon, CheckIcon } from '@chakra-ui/icons';
import React, { useState, useEffect } from 'react';

function TodoList({ todos, deleteTodo, editTodo, todoDone }) {
  const [todo, setTodo] = useState('');
  const [modalValue, setModalValue] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isDoneModalOpen, setIsDoneModalOpen] = useState(false);
  const [completedTodos, setCompletedTodos] = useState([]);
// بارگذاری اطلاعات از Local Storage در هنگام بارگذاری کامپوننت
  useEffect(() => {
        const storedCompletedTodos = localStorage.getItem('completedTodos');
    if (storedCompletedTodos) {
      setCompletedTodos(JSON.parse(storedCompletedTodos));
    }
  }, []);

  useEffect(() => {
    // ذخیره اطلاعات در Local Storage هنگام تغییر در completedTodos
    localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
  }, [completedTodos]);

   
  function onClosed() {
    setIsOpen(false);
  }

  function handleEditClick(todo) {
    setIsOpen(true);
    // we've set the passed todo to modal value
    setModalValue(todo);
    console.log(todo);
  }

  function handleEditInputChange(e, id) {
    setModalValue({ ...modalValue, text: e.target.value });
    console.log(modalValue, id);
  }

  function handleEditSubmit(e) {
    e.preventDefault();

    editTodo(modalValue.id, modalValue);
    setModalValue('');
    setIsOpen(false);
  }

  //   TodoDone

  function onClose() {
    setIsDoneModalOpen(false);
  }

  function handleDoneClick(todo) {
    setIsDoneModalOpen(true);
  //  todo را به modal پاس دادم..
    setModalValue(todo);
    console.log(todo);
  }

  function handleDoneSubmit(e) {
    e.preventDefault();
    todoDone(modalValue.id, modalValue);
    // پس از انجام تسک، مقدار modalValue را خالی می کنم
  setModalValue('');
  setIsDoneModalOpen(false);
  
}

  

  return !todos.length ? (
    <Badge colorScheme="purple" variant="outline" borderRadius="4" p="4" m="5">
      امروز تسکی وارد نشده است!!
    </Badge>
  ) : (
    <VStack>
      {todos.map(todo => (
        <HStack spacing="24px" w="320px">
          <Flex p={6} w="300px" h="50px" justifyContent="space-between">
            <Text>{todo.text}</Text>

            <Flex w="10px">
              <DeleteIcon
                color="red.500"
                mr="2"
                onClick={() => deleteTodo(todo.id)}
              />

              <EditIcon onClick={() => handleEditClick(todo)} />

              {/* todoDone icon */}
              <CheckIcon
                onClick={() => handleDoneClick(todo)}
                isRound={true}
                variant="solid"
                colorScheme="teal"
                aria-label="Done"
                fontSize="20px"
                ml="2"
              />
            </Flex>

            {/* modal for editing a todo */}
            <Modal isOpen={isOpen} onClose={onClosed}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>تسک خود را ویرایش کنید...</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleEditSubmit}>
                  <ModalBody>
                    <Input
                      value={modalValue.text}
                      key={modalValue.id}
                      variant="outline"
                      type="text"
                      placeholder="تسک خود را آپدیت کنید..."
                      onChange={handleEditInputChange}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onClosed}>
                      بستن
                    </Button>
                    <Button type="submit" colorScheme="teal" mr={3}>
                      ویرایش
                    </Button>
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>

            {/* modal for a task done */}
            <Modal isOpen={isDoneModalOpen} onClose={setIsDoneModalOpen}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>تسک با موفقیت انجام شد</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={handleDoneSubmit}>
                  
                  <ModalFooter>
                    <Button colorScheme="teal" mr={3} onClick={onClose}>
                      بستن
                    </Button>
                    
                  </ModalFooter>
                </form>
              </ModalContent>
            </Modal>
          </Flex>
        </HStack>
      ))}
    </VStack>
  );
}

export default TodoList;
