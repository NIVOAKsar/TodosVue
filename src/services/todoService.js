import { makeId } from '@/services/utilsService'

// factory
export function createTodo(title, description) {
    return {
        id: makeId(4),
        createdAt: new Date(),
        title,
        description
    }
}

// api


