export const read = (userId, token) => {
    return fetch(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json();
    })
}

export const list = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/users`, {
        method: "GET",
    }).then(response => {
        return response.json();
    })
}