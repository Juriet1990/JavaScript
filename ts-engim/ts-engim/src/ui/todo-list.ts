import { Todo, TodoCategory } from "../models/todo.model";
import { HttpService } from "../services/http.service";

const todoWrapper = document.querySelector('#todo-wrapper');

function createTodoFromObject(obj: any): Todo {
    return new Todo(
        obj.id,
        obj.title,
        obj.description,
        obj.completed,
        new Date(obj.createdAt),
        obj.important,
        obj.inProgress,
        obj.done,
        obj.category
    );
}

function renderTodoList(todos: Todo[]) {
    if (!todoWrapper) return;

    // Pulisci il wrapper prima di aggiungere nuovi elementi
    todoWrapper.innerHTML = '';
    todos.forEach(todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item', 'p-4', 'border', 'rounded-lg', 'mb-2', 'relative');
        todoItem.innerHTML = `
            <div class="flex justify-between items-start">
                <div>
                    <p class="text-sm text-gray-500">${todo.getCreatedAt().toLocaleDateString()}</p>
                    <h3 class="text-xl font-bold">${todo.getTitle()}</h3>
                    <p class="text-gray-600">${todo.getDescription()}</p>
                </div>
                <div class="flex gap-2">
                    <button class="edit-todo-btn p-2 text-primary hover:bg-gray-100 rounded-full" data-id="${todo.getId()}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button class="delete-todo-btn p-2 text-red-500 hover:bg-gray-100 rounded-full" data-id="${todo.getId()}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="flex gap-2 mt-2">
                <span class="px-2 py-1 rounded ${todo.getImportant() ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}">${todo.getImportant() ? 'Importante' : 'Normale'}</span>
                ${!todo.getDone() ? `
                    <span class="px-2 py-1 rounded ${todo.getInProgress() ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}">${todo.getInProgress() ? 'In Progress' : 'Non Iniziato'}</span>
                ` : ''}
                <span class="px-2 py-1 rounded ${todo.getDone() ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">${todo.getDone() ? 'Completato' : 'Da Fare'}</span>
                <span class="px-2 py-1 rounded ${todo.getCategory() === TodoCategory.WORK ? 'bg-purple-100 text-purple-800' : todo.getCategory() === TodoCategory.PERSONAL ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">${todo.getCategory()}</span>
            </div>
            <div class="flex gap-2 mt-4">
                ${!todo.getDone() ? `
                    <button class="toggle-in-progress-btn px-3 py-1 rounded ${todo.getInProgress() ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}" data-id="${todo.getId()}">
                        ${todo.getInProgress() ? 'Ferma' : 'Inizia'}
                    </button>
                ` : ''}
                <button class="toggle-done-btn px-3 py-1 rounded ${todo.getDone() ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}" data-id="${todo.getId()}">
                    ${todo.getDone() ? 'Da Fare' : 'Completa'}
                </button>
            </div>
        `;
        todoWrapper.appendChild(todoItem);
    });

    // Aggiungi event listener per i pulsanti di modifica
    document.querySelectorAll('.edit-todo-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id;
            if (id) {
                openEditModal(id);
            }
        });
    });

    // Aggiungi event listener per i pulsanti di stato
    document.querySelectorAll('.toggle-in-progress-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id;
            if (id) {
                await toggleInProgress(id);
            }
        });
    });

    document.querySelectorAll('.toggle-done-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id;
            if (id) {
                await toggleDone(id);
            }
        });
    });

    // Aggiungi event listener per i pulsanti di eliminazione
    document.querySelectorAll('.delete-todo-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = (e.currentTarget as HTMLElement).dataset.id;
            if (id) {
                if (confirm('Sei sicuro di voler eliminare questa task?')) {
                    await deleteTodo(id);
                }
            }
        });
    });
}

// Funzione per aprire la modale di modifica
async function openEditModal(id: string) {
    const todos = await HttpService.get();
    const todoData = todos.find(t => t.getId() === id);

    if (!todoData) return;

    const todo = new Todo(
        todoData.getId(),
        todoData.getTitle(),
        todoData.getDescription(),
        todoData.getCompleted(),
        todoData.getCreatedAt(),
        todoData.getImportant(),
        todoData.getInProgress(),
        todoData.getDone(),
        todoData.getCategory()
    );

    // Popola il form con i dati della task
    (document.getElementById('edit-title') as HTMLInputElement).value = todo.getTitle();
    (document.getElementById('edit-description') as HTMLTextAreaElement).value = todo.getDescription();
    (document.getElementById('edit-category') as HTMLSelectElement).value = todo.getCategory();
    (document.getElementById('edit-important') as HTMLInputElement).checked = todo.getImportant();
    (document.getElementById('edit-in-progress') as HTMLInputElement).checked = todo.getInProgress();
    (document.getElementById('edit-done') as HTMLInputElement).checked = todo.getDone();

    // Salva l'ID della task da modificare
    (document.getElementById('edit-todo-form') as HTMLFormElement).dataset.id = id;

    // Mostra la modale
    document.getElementById('edit-modal')?.classList.remove('hidden');
    document.getElementById('edit-modal')?.classList.add('flex');
}

// Funzione per cambiare lo stato "in progress"
async function toggleInProgress(id: string) {
    const todos = await HttpService.get();
    const todoData = todos.find(t => t.getId() === id);

    if (!todoData) return;

    const todo = new Todo(
        todoData.getId(),
        todoData.getTitle(),
        todoData.getDescription(),
        todoData.getCompleted(),
        todoData.getCreatedAt(),
        todoData.getImportant(),
        todoData.getInProgress(),
        todoData.getDone(),
        todoData.getCategory()
    );

    // Se la task è completata, non possiamo cambiare lo stato in progress
    if (todo.getDone()) return;

    todo.setInProgress(!todo.getInProgress());
    await HttpService.put(todo);

    // Ricarica la lista
    const currentFilter = document.querySelector('aside li.selected')?.id || 'all';
    await filterTodos(currentFilter);
}

// Funzione per cambiare lo stato "done"
async function toggleDone(id: string) {
    const todos = await HttpService.get();
    const todoData = todos.find(t => t.getId() === id);

    if (!todoData) return;

    const todo = new Todo(
        todoData.getId(),
        todoData.getTitle(),
        todoData.getDescription(),
        todoData.getCompleted(),
        todoData.getCreatedAt(),
        todoData.getImportant(),
        todoData.getInProgress(),
        todoData.getDone(),
        todoData.getCategory()
    );

    const newDoneState = !todo.getDone();
    todo.setDone(newDoneState);

    // Se la task è completata, resetta lo stato in progress
    if (newDoneState) {
        todo.setInProgress(false);
    }

    await HttpService.put(todo);

    // Ricarica la lista
    const currentFilter = document.querySelector('aside li.selected')?.id || 'all';
    await filterTodos(currentFilter);
}

//la funzione deve filtrare sulla base dell'elemento che si è cliccato nell'aside
export async function filterTodos(filter: string) {
    console.log(filter);
    const todos = await HttpService.get();
    let filteredTodos: Todo[] = todos.map(todo => createTodoFromObject(todo));

    switch (filter) {
        case 'done':
            filteredTodos = filteredTodos.filter(todo => todo.getDone());
            break;
        case 'important':
            filteredTodos = filteredTodos.filter(todo => todo.getImportant());
            break;
        case 'in-progress':
            filteredTodos = filteredTodos.filter(todo => todo.getInProgress());
            break;
        case 'work':
            filteredTodos = filteredTodos.filter(todo => todo.getCategory() === TodoCategory.WORK);
            break;
        case 'personal':
            filteredTodos = filteredTodos.filter(todo => todo.getCategory() === TodoCategory.PERSONAL);
            break;
        case 'other':
            filteredTodos = filteredTodos.filter(todo => todo.getCategory() === TodoCategory.OTHER);
            break;
        default:
            filteredTodos = filteredTodos;
            break;
    }
    renderTodoList(filteredTodos);
}

// Funzione per eliminare una task
async function deleteTodo(id: string) {
    try {
        await HttpService.delete(id);

        // Ricarica la lista
        const currentFilter = document.querySelector('aside li.selected')?.id || 'all';
        await filterTodos(currentFilter);
    } catch (error) {
        console.error('Errore durante l\'eliminazione della task:', error);
    }
}