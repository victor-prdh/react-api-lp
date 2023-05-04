const Logout = (navigate) => {
    
    console.log('REDIRECT');

    localStorage.clear()
    navigate('/login')
}

export const Request = async (url, set, navigate) => {

    var token = localStorage.getItem('token');

    if (!token) {
        Logout(navigate)
        return
    } else {
        var data = fetch(url, {
            headers: {
                Authorization: 'Bearer '.concat(token),
                
            }
        })
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
                return
            })
    }

    
}
