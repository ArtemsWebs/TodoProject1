import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Note from './img/notepad.png';
import { Taxios } from '@simplesmiler/taxios';
import { Todo, AddResponse, TodoAdd } from './TypeIntefice';
import TodoList from './TodoList';
import axios from 'axios';
import {Todos} from '../../Todos';


const taxios=new Taxios<Todos>(axios.create({ baseURL: 'http://localhost:5003' }));


// eslint-disable-next-line no-console

//Styled-Component
const Input = styled.input`
  margin: 30px auto;
  width: 60%;
  height: 50px;
  padding-left: 10px;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 1px 9px 2px rgba(34, 60, 80, 0.6), 0 1px 9px 2px rgba(34, 60, 80, 0.6) inset;
  font-size: 20px;
  font-size: 13px;
`;

const Main = styled.div`
  background: #fff;
`;
const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const TaskContainer = styled(InputContainer)`
  background-image: url(${Note});
  background-size: cover;
  min-height: 800px;
  width: 63%;
  margin: 0 auto;
`;

const TodoForm = () => {
  //UseState
  let [todos, setTodos] = useState<Todo[]>([]);
  let [input, setInputState] = useState<string>('');


  const getTodo=async ()=>{
    await taxios.get('/todo/get_todo').then((response)=>{
        if (response.status===200)
          setTodos(response.data.map((value)=>{return {...value, chStatus: false};
        }))
        ;},
    );
  };


  useEffect(() => {
    //Добавляем элементы из бд
    getTodo();
  }, []);

  //добавляет элементы в localStorage, грубо говоря действия выполняються
  //до рендеринга


  //Функции реализующие изменения state, изменяет пол
  const editTodo = async (id: number, task: string)=> {
    await taxios.put('/todo/update_todo',{id:id,content:task}).then(response=>{
      if (response.status===200)
      setTodos((prevState) =>
        prevState.map((todo) => {
          if (todo.id === response.data.id && todo.chStatus && response.data.content)
            return { ...todo, content: response.data.content };
          return { ...todo};
        }),
      );
    });
  };

  const deleteTodo =async (id: number) => {
    await taxios.$delete('/todo/delete_todo/{TodoId}',{params:{TodoId:id}})
      .then((response)=>{
          // eslint-disable-next-line no-console
          console.log(response.id);
          // eslint-disable-next-line no-console
          console.log('Я тут');
          setTodos(prevState => prevState.filter((todo) => {
            return todo.id !== id;
          }));
      });
  };

  const editToogle = (id: number, check: boolean): void => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, chStatus: check };
        }
        return { ...todo };
      }),
    );
  };
  const setInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setInputState(event.target.value);
  };

  const keyPressEnter =async (event: React.KeyboardEvent<HTMLInputElement>)=>{
    if (event.key === 'Enter' && input) {
      const newTodo: TodoAdd = {
        content:input,
      };
      //Берем в расчет предидущее состояния todo

      await taxios.post('/todo/add_todo',{content:newTodo.content})
        .then((response)=>{
          if (response.status===200)
          setTodos(prevState => {
            let newState=prevState.slice();
            newState.push({id:response.data.id,content:newTodo.content,chStatus:false});
            return newState;
          });
        });
      setInputState('');
    }
  };

  //Отрисовка
  return (
    <Main>
      <InputContainer>
        <Input placeholder="Введите задачу..." value={input} onChange={setInput} onKeyPress={keyPressEnter} />
      </InputContainer>
      <TaskContainer>
        <TodoList todo={todos} editTodo={editTodo} deleteTodo={deleteTodo} editToogle={editToogle} cur_input={input} />
      </TaskContainer>
    </Main>
  );
};
export default TodoForm;
