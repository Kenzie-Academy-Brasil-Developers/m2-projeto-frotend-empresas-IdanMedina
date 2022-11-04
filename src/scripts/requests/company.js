export async function registerComp(token,body) {
    const data = await fetch(`http://localhost:6278/users/departments/coworkers`, {
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