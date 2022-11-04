export async function userInfo(token) {
    const data = await fetch(`http://localhost:6278/users/profile`, {
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

export async function depUsers(token) {
    const data = await fetch(`http://localhost:6278/users/departments/coworkers`, {
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

  export async function userDeps(token) {
    const data = await fetch(`http://localhost:6278/users/departments`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((error) => console.log(error));
  
    return data;
  }

  export async function updateUser(token, body) {
    const data = await fetch(`http://localhost:6278/users`, {
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