export async function departments(token) {
    const data = await fetch(`http://localhost:6278/departments`, {
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

export async function compDeps(id, token) {
    const data = await fetch(`http://localhost:6278/departments/${id}`, {
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

export async function createDep(token,body) {
    const data = await fetch(`http://localhost:6278/departments`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
    
    return data;
}

export async function hireUser(token, body) {
    const data = await fetch(`http://localhost:6278/departments/hire`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
    
    return data;
}

export async function fireUser(id, token) {
    const data = await fetch(`http://localhost:6278/departments/dismiss/${id}`, {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
    
    return data;
}

export async function updateDep(id, token, body) {
    const data = await fetch(`http://localhost:6278/departments/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
    
    return data;
}

export async function deleteDep(id, token) {
    const data = await fetch(`http://localhost:6278/departments/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((res) => res)
      .catch((error) => console.log(error));
    
      return data
  }