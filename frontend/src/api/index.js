import axios from 'axios';

export const baseUrl = 'http://localhost:8000/api/v1/'


export const fetchProduct = async (productId) => {
    const url = baseUrl + 'products/' + productId

    try {
        const product = await axios.get(url)

        return product.data
    } catch (error) {
        return error
    }
}

// Depricated
export const fetchAllProducts = async () => {
    const url = baseUrl + 'products/'
    let response = {}

    try {
        const data = await axios.get(url)
        response.data = data
        response.error = undefined
        return response
    } catch (error) {

        response.error = {}
        console.error(error.response.data.detail)
        console.error(error.response.status)
        response.error.data = error.response.data.detail
        response.error.status = error.response.status
        return response
    }
}

// Depricated
export const fetchUserAddresses = async (userId) => {
    const url = baseUrl + `user_address?user=${userId}`
    
    return await axios.get(url)
        .then((response) => {
            return response.data
        })
        .catch(error => {
            console.log(error.response.data) 
            return error
        })
}
// Depricated

export const userSignIn = async (username, password) => {
    const url = baseUrl + 'dj-rest-auth/login/'

    try {
        const data = await axios.post(url,
            {
                "username": "username",
                "password": password
            })
            console.log(data)
        return data
    } catch (error) {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.data)
        return error
    }
}

// Deprecated
export const userRegister = async (username, email, password1, password2) => {
    // const url = baseUrl + 'dj-rest-auth/registration/'
    const url = baseUrl + 'dj-rest-auth/login/'

    const data = {
        "username": username,
        "email": email,
        "password1": password1,
        "password2": password2
    }
    console.log(data)

    axios.post(url,
        {
            "username": 'ajvjv',
            "password": 'password'
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            const errord = JSON.stringify(error)
            console.log(errord);
        });
}