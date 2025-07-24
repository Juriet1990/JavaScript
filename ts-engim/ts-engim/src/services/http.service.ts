import { getTodos, addTodo, updateTodo, deleteTodo } from "../db/db";
import { Todo } from "../models/todo.model";
export class HttpService {
    static async get() {
        try {
            const res = await getTodos();
            return await new Promise<Todo[]>((resolve, reject) => {
                res.onsuccess = () => {
                    const todos = res.result as any[];
                    const todoObjects = todos.map(todo => new Todo(
                        todo.id,
                        todo.title,
                        todo.description,
                        todo.completed,
                        new Date(todo.createdAt),
                        todo.important,
                        todo.inProgress,
                        todo.done,
                        todo.category
                    ));
                    resolve(todoObjects);
                };
                res.onerror = () => reject(res.error);
            });
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    static async post(todo: Todo) {
        try {
            await addTodo(todo);
        } catch (error) {
            console.error(error);
        }
    }

    static async put(todo: Todo) {
        try {
            await updateTodo(todo);
        } catch (error) {
            console.error(error);
        }
    }   

    static async delete(id: string) {
        try {
            await deleteTodo(id);
        } catch (error) {
            console.error(error);
        }
    }   
}