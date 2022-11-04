export async function createUser(body) {
    
    const data = await fetch(`http://localhost:6278/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((res) =>  res)
    .catch((error) => console.log(error));
    
    return data;
}

export async function login(body) {
    const data = await fetch(`http://localhost:6278/auth/login`, {
        method: "POST",
        headers: {
             "Content-Type": "application/json" 
            },
        body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
    
    return data;
}

export async function companies() {
    const data = await fetch(`http://localhost:6278/companies`, {
        method: "GET",
        headers: {
            "Authorization": 'Bearer null'
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
    
    return data;
}

export async function compsBySector(sector) {
    const data = await fetch(`http://localhost:6278/companies/${sector}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer null`
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
    
    return data;
}

export async function sectors() {
    const data = await fetch(`http://localhost:6278/sectors`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer null`
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
    
    return data;
}

export async function validateUser(token) {
    const data = await fetch(`http://localhost:6278/auth/validate_user`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
    
    return data;
}
