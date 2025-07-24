import { openDB } from './db/db'
import './style.css'
import { filterTodos } from './ui/todo-list';
import { HttpService } from './services/http.service';
import { Todo, TodoCategory } from './models/todo.model';

const asideElements = document.querySelectorAll('aside li');
const modal = document.getElementById('todo-modal');
const editModal = document.getElementById('edit-modal');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const editTodoForm = document.getElementById('edit-todo-form') as HTMLFormElement;
const cancelBtn = document.getElementById('cancel-btn');
const editCancelBtn = document.getElementById('edit-cancel-btn');

async function connectToIndexedDB() {
    try {
        const db = await openDB()
        console.log(db)
    } catch (error) {
        console.error(error)
    }
}

// Funzione per creare le todo di esempio
async function createSampleTodos() {
    const sampleTodos = [
        new Todo(
            '1',
            'Completare il progetto Todo App',
            'Finire l\'implementazione delle funzionalità base',
            false,
            new Date(),
            true,
            true,
            false,
            TodoCategory.WORK
        ),
        new Todo(
            '2',
            'Fare la spesa',
            'Comprare frutta e verdura',
            false,
            new Date(),
            false,
            false,
            false,
            TodoCategory.PERSONAL
        ),
        new Todo(
            '3',
            'Chiamare il dentista',
            'Prenotare controllo annuale',
            false,
            new Date(),
            true,
            false,
            false,
            TodoCategory.OTHER
        )
    ];

    for (const todo of sampleTodos) {
        await HttpService.post(todo);
    }
}

// Funzione per gestire il click su un elemento dell'aside
async function handleAsideClick(li: Element) {
    document.querySelectorAll('aside li').forEach(item => {
        item.classList.remove('selected');
    });
    
    li.classList.add('selected');
    
    const title = document.querySelector('#todo-list-header h2');
    if (title) {
        title.textContent = li.textContent + ' List';
    }
    await filterTodos(li.id);
}

// Funzione per mostrare/nascondere la modale
function toggleModal() {
    if (modal) {
        modal.classList.toggle('hidden');
        modal.classList.toggle('flex');
        // Resetta il form e nascondi i messaggi di errore quando si apre la modale
        if (todoForm) {
            todoForm.reset();
            hideAllErrorMessages();
        }
    }
}

// Funzione per mostrare/nascondere la modale di modifica
function toggleEditModal() {
    if (editModal) {
        editModal.classList.toggle('hidden');
        editModal.classList.toggle('flex');
        // Resetta il form e nascondi i messaggi di errore quando si apre la modale
        if (editTodoForm) {
            hideAllErrorMessages('edit-');
        }
    }
}

// Funzione per nascondere tutti i messaggi di errore
function hideAllErrorMessages(prefix = '') {
    const errorMessages = document.querySelectorAll(`[id$="${prefix}error"]`);
    errorMessages.forEach(msg => {
        (msg as HTMLElement).classList.add('hidden');
    });
}

// Funzione per validare il form
function validateForm(form: HTMLFormElement, prefix = ''): boolean {
    let isValid = true;
    hideAllErrorMessages(prefix);

    // Validazione titolo
    const title = (document.getElementById(`${prefix}title`) as HTMLInputElement).value;
    if (title.length < 3) {
        document.getElementById(`${prefix}title-error`)?.classList.remove('hidden');
        isValid = false;
    }

    // Validazione descrizione
    const description = (document.getElementById(`${prefix}description`) as HTMLTextAreaElement).value;
    if (description.length < 10) {
        document.getElementById(`${prefix}description-error`)?.classList.remove('hidden');
        isValid = false;
    }

    // Validazione categoria
    const category = (document.getElementById(`${prefix}category`) as HTMLSelectElement).value;
    if (!category) {
        document.getElementById(`${prefix}category-error`)?.classList.remove('hidden');
        isValid = false;
    }

    return isValid;
}

// Funzione per gestire il submit del form
async function handleFormSubmit(event: Event) {
    event.preventDefault();
    
    if (!validateForm(todoForm)) {
        return;
    }

    const formData = new FormData(todoForm);
    const newTodo = new Todo(
        Date.now().toString(), // ID temporaneo
        formData.get('title') as string,
        formData.get('description') as string,
        false, // completed
        new Date(), // createdAt
        formData.get('important') === 'on', // important
        formData.get('inProgress') === 'on', // inProgress
        false, // done
        formData.get('category') as TodoCategory
    );

    try {
        await HttpService.post(newTodo);
        todoForm.reset();
        toggleModal();
        
        // Ricarica la lista delle task
        const currentFilter = document.querySelector('aside li.selected')?.id || 'all';
        await filterTodos(currentFilter);
    } catch (error) {
        console.error('Errore durante il salvataggio della task:', error);
    }
}

// Funzione per gestire il submit del form di modifica
async function handleEditFormSubmit(event: Event) {
    event.preventDefault();
    
    if (!validateForm(editTodoForm, 'edit-')) {
        return;
    }

    const formData = new FormData(editTodoForm);
    const id = editTodoForm.dataset.id;
    
    if (!id) return;

    const todos = await HttpService.get();
    const todo = todos.find(t => t.getId() === id);
    
    if (!todo) return;

    // Aggiorna la task con i nuovi dati
    todo.setTitle(formData.get('title') as string);
    todo.setDescription(formData.get('description') as string);
    todo.setCategory(formData.get('category') as TodoCategory);
    todo.setImportant(formData.get('important') === 'on');
    todo.setInProgress(formData.get('inProgress') === 'on');
    todo.setDone(formData.get('done') === 'on');

    try {
        await HttpService.put(todo);
        toggleEditModal();
        
        // Ricarica la lista delle task
        const currentFilter = document.querySelector('aside li.selected')?.id || 'all';
        await filterTodos(currentFilter);
    } catch (error) {
        console.error('Errore durante l\'aggiornamento della task:', error);
    }
}

// Funzione per gestire l'interazione tra le checkbox
function setupCheckboxInteraction() {
    const inProgressCheckbox = document.getElementById('edit-in-progress') as HTMLInputElement;
    const doneCheckbox = document.getElementById('edit-done') as HTMLInputElement;

    if (inProgressCheckbox && doneCheckbox) {
        inProgressCheckbox.addEventListener('change', () => {
            if (inProgressCheckbox.checked) {
                doneCheckbox.checked = false;
            }
        });

        doneCheckbox.addEventListener('change', () => {
            if (doneCheckbox.checked) {
                inProgressCheckbox.checked = false;
            }
        });
    }
}

// Inizializzazione
async function initializeApp() {
    await connectToIndexedDB();
    await createSampleTodos();
    
    // Seleziona e mostra "All" come default
    const allElement = asideElements[0];
    if (allElement) {
        allElement.classList.add('selected');
        await handleAsideClick(allElement);
    }
    
    // Aggiungi event listener a tutti gli elementi dell'aside
    asideElements.forEach(li => {
        li.addEventListener('click', () => handleAsideClick(li));
    });

    // Aggiungi event listener
    if (addTodoBtn) {
        addTodoBtn.addEventListener('click', toggleModal);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', toggleModal);
    }

    if (editCancelBtn) {
        editCancelBtn.addEventListener('click', toggleEditModal);
    }

    if (todoForm) {
        todoForm.addEventListener('submit', handleFormSubmit);
    }

    if (editTodoForm) {
        editTodoForm.addEventListener('submit', handleEditFormSubmit);
    }

    // Setup interazione checkbox
    setupCheckboxInteraction();
}

initializeApp();
