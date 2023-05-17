const Logout = (navigate) => {
    
    console.log('REDIRECT');

    localStorage.clear()
    navigate('/login')
}

export const Request = async ({url, set, navigate, body}) => {
    
    var token = localStorage.getItem('token');

    const init = {
        headers: {
            Authorization: 'Bearer '.concat(token), 
            'Content-Type': 'application/json'
        },
        method: body ? 'POST' : 'GET',
        body: body ? JSON.stringify(body) : null
    }

    console.log(init);

    if (!token) {
        Logout(navigate)
        return
    } else {
        var data = fetch(url, init)
            .then(async (response) => {
                if (response.status === 401) {
                    var data = await response.json()
                    alert(data.message);
                    Logout(navigate)
                    return
                }

                return response.json()
            })
            .then((data) => {
                if (data['hydra:member']) {
                    set(data['hydra:member'])
                } else {
                    set(data);
                }
                return data
            })

        return data
    }

    
}
