export type Todo = {
  id?:number
  content?: string;
  chStatus: boolean;
};
export type AddResponse=Omit<Todo, 'chStatus'>
export type TodoAdd=Pick<Todo,'content'>
