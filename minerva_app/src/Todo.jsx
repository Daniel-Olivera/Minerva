import React, { useEffect, useState, Component } from 'react'
import { Amplify, API, Auth, graphqlOperation } from 'aws-amplify'
import { createTodo } from './graphql/mutations'
import { listTodos } from './graphql/queries'
import '@aws-amplify/ui-react/styles.css';


async function ionViewCanEnter(){   
    try {
        await Auth.currentAuthenticatedUser()     
        return true   
    } catch(e) {
        return false  
    }
}

const Todo = () => {
    const initialState = { name: '', description: '' }

    const [todos, setTodos] = useState([])
    const [formState, setFormState] = useState(initialState)
    
    useEffect(() => {
        fetchTodos()
    }, [])
    
    function setInput(key, value) {
        setFormState({ ...formState, [key]: value })
    }
    
    async function fetchTodos() {
        try {
        const todoData = await API.graphql(graphqlOperation(listTodos))
        const todos = todoData.data.listTodos.items
        setTodos(todos)
        } catch (err) { console.log('error fetching todos') }
    }
    
    async function addTodo() {
        try {
        if (!formState.name || !formState.description) return
        const todo = { ...formState }
        setTodos([...todos, todo])
        setFormState(initialState)
        await API.graphql(graphqlOperation(createTodo, {input: todo}))
        } catch (err) {
        console.log('error creating todo:', err)
        }
    }
    
    return(
        <div style={styles.container}>
            <Heading level={1}>Hello {user.username}</Heading>
            <Button onClick={signOut}>Sign out</Button>
            <h2>Amplify Todos</h2>
            <input
                onChange={event => setInput('name', event.target.value)}
                style={styles.input}
                value={formState.name}
                placeholder="Name"
            />
            <input
                onChange={event => setInput('description', event.target.value)}
                style={styles.input}
                value={formState.description}
                placeholder="Description"
            />
            <button style={styles.button} onClick={addTodo}>Create Todo</button>
            {
                todos.map((todo, index) => (
                <div key={todo.id ? todo.id : index} style={styles.todo}>
                    <p style={styles.todoName}>{todo.name}</p>
                    <p style={styles.todoDescription}>{todo.description}</p>
                </div>
                ))
            }
        </div>
    )
}    

export default Todo
