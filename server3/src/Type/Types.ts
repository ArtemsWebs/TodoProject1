export type Bodys={
  readonly id:number,
  content:string
}
export type BodysAdd=Omit<Bodys,"id">
export type Todo={
  body:Bodys
}
export type TodoId={
  body:Bodys|Pick<Bodys, "id">
}
export type TodoAdd={
  body:Omit<Bodys, "id">
}

export type GetTodo={
  (req:any, res:any):Promise<number|string>
}
export type RequestDelete= {
  url: string,
}
export type RequestUp={
    body:Todo
}

export type UpTodo={
  (req:Todo, res:any):Promise<string|any>
}
export type AddTodo={
  (req:TodoAdd, res:any):Promise<string>
}

export type DeleteTodo={
  (req:RequestDelete, res:any):Promise<number|string>
}
