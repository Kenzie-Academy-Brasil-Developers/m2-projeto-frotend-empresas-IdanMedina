export async function users(token) {
    const data = await fetch(`http://localhost:6278/users`, {
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

export async function usersAvailable(token) {
    const data = await fetch(`http://localhost:6278/admin/out_of_work`, {
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

export async function updateDepUser(id, token, body) {
    const data = await fetch(`http://localhost:6278/admin/update_user/${id}`, {
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
export async function deleteUser(id, token) {
    const data = await fetch(`http://localhost:6278/admin/delete_user/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((res) => res)
      .catch((error) => console.log(error));

    return data
  }