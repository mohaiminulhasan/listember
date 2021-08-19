export const userService = {
    login
}

async function login(username, password) {
    // env variables should be used to get domain address
    const uri = 'http://127.0.0.1:8000/api-token-auth/';

    let h = new Headers();
    h.append('Content-Type', 'application/json')

    let req = new Request(uri, {
        method: 'POST',
        headers: h,
        body: JSON.stringify({ username, password }),
        mode: 'cors'
    });

    const response = await fetch(req);
    const json = await response.json();

    return json;
}