export namespace Todos {
    export interface updateTodo {
        id?: number;
        content?: string;
        [k: string]: unknown;
    }
    export interface addTodoResponse {
        id?: number;
        content?: string;
        [k: string]: unknown;
    }
    export interface addTodo {
        content?: string;
        [k: string]: unknown;
    }
    export interface updateTodoResponse {
        id?: number;
        content?: string;
        [k: string]: unknown;
    }
    export type getTodoResponse = Todos.getTodoResponse_inner[];
    export interface deleteTodoResponse {
        id?: number;
        [k: string]: unknown;
    }
    export interface deleteTodo {
        id?: number;
        [k: string]: unknown;
    }
    export interface getTodoResponse_inner {
        id: number;
        content: string;
    }
}

export interface Todos {
    version: '1';
    routes: {
        '/todo/delete_todo/{TodoId}': {
            DELETE: {
                params: {
                    TodoId: number;
                };
                response: Todos.deleteTodoResponse;
            };
        };
        '/todo/get_todo': {
            GET: {
                response: Todos.getTodoResponse;
            };
        };
        '/todo/update_todo': {
            PUT: {
                body: Todos.updateTodo;
                response: Todos.updateTodoResponse;
            };
        };
        '/todo/update_todo?id=100&content="Убратьпосуду"': {
            PUT: {
                query?: {
                    id?: number;
                    content?: string;
                };
                response: Todos.updateTodoResponse;
            };
        };
        '/todo/add_todo': {
            POST: {
                body: Todos.addTodo;
                response: Todos.addTodoResponse;
            };
        };
        '/todo/all_delete': {
            DELETE: {};
        };
    };
}
