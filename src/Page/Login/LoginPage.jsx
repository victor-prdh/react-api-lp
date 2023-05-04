import LoginForm from "../../Component/LoginForm/LoginForm";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getUserData()
    } , [])

    const [ formSubmitting, setFormSubmitting ] = useState(false);
    const handleSubmit = (credentials) => {
        setFormSubmitting(true);
        try {
            fetch("http://localhost:8000/auth", {
                method: 'POST',
                cache: "no-cache", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials)
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    getUserData(data.token)
                    setTimeout(() => {
                        navigate('/')
                    }, 500);
                    console.log('TOKEN SAVED');
                } else {
                    alert('Erreur lors de la connexion')
                }
            });
        } catch (error) {
            console.log(error);
            alert('Erreur lors de la connexion')
        } finally {
            setFormSubmitting(false);
        }
    };

    const getUserData = () => {
        setFormSubmitting(true);
        let token = localStorage.getItem('token');
        if (!token ) {
            return logout()
        }
        
        try {
            fetch("http://localhost:8000/api/users/me", {
                headers: {
                    Authorization: 'Bearer '.concat(token)
                }
              })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    setUser(data)
                } else {
                    alert('Erreur lors de la récupération des datas de l\'utilisateur')
                }
                setIsLoading(false)
            });
        } catch (error) {
            console.log(error);
            setIsLoading(false)
            alert('Erreur lors de la connexion')
        }

        
    };

    const logout = () => {
        localStorage.clear()
        setUser(null)
        navigate('/login')
        setIsLoading(false)
    }

    return(
        <div>
            {
                isLoading ?
                <h3>Loading</h3>
                : user ?
                    <>
                    <h1>
                        Déjà connecté en tant que: {user.email}
                    </h1>
                    <button onClick={logout}>Se déconnecter</button>
                    </> :
                    <LoginForm
                        handleSubmit={handleSubmit}
                    />
            }
            

        </div>
    )
}

export default LoginPage;