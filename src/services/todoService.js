import { makeId } from '@/services/utilsService'

// factory
export function makeTodo(title, description) {
    return {
        createdAt: new Date(),
        isSyncing: false, // prevent ui actions (use suspense loader) if processing with server (fetching, saving, deleting) 
        isDone: false,
        title,
        description,
    }
}


export function makeTodos() {
    // let ids = new Array(10).fill().map(() => makeId(4));
    let contents = [
        makeTodo('Apple', 'Slice the apple'),
        makeTodo('Melon', 'Wash the melon'),
        makeTodo('Banana', 'Eat the banana'),
        makeTodo('Pineapple', 'Take a pineapple photo'),
        makeTodo('Lemon', 'Squeeze it hard!'),
        makeTodo('Grape', 'Eat them fresh'),
        makeTodo('Qiwi', 'Sweet but soury'),
        makeTodo('Passionfruit', 'Crunchy!'),
        makeTodo('Mango', 'Make me wet & sticky'),
        makeTodo('Orange', 'Fuled with C Vitamin!'),
    ]

    return contents.reduce((acc, val) => {
        acc[makeId(4)] = val;
        return acc;
    }, {})



}


// api


