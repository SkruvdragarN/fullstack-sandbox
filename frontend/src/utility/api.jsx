import axios from 'axios'

const baseUrl = "http://localhost:3001"

const endpoints = {
    allPosts: "/todo/",
}

const getTodoLists = () => {
    return axios.get(baseUrl + endpoints.allPosts)
        .then(res => res.data)
}

const postUpdatedTodoList = (listID, todos) => {
    axios.post(baseUrl + endpoints.allPosts + listID, todos)
}

export default {
    getTodoLists,
    postUpdatedTodoList
}