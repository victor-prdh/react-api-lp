import LoginForm from "../../Component/LoginForm/LoginForm";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async() => {
            let tempUser = localStorage.getItem('user');
            if (tempUser) {
                tempUser = await JSON.parse(tempUser);
                setUser(tempUser)
            }
        }

        getUser()
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
                    saveUserData(data.token)
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

    const saveUserData = (token) => {
        setFormSubmitting(true);
        try {
            fetch("http://localhost:8000/api/users/me", {
                headers: {
                    Authorization: 'Bearer '.concat(token)
                }
              })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    localStorage.setItem('user', JSON.stringify(data));
                    console.log(data);
                    return data
                } else {
                    alert('Erreur lors de la récupération des datas de l\'utilisateur')
                }
            });
        } catch (error) {
            console.log(error);
            alert('Erreur lors de la connexion')
        }
    };

    const logout = () => {
        localStorage.clear()
        setUser(null)
        navigate('/login')
    }

    return(
        <div>
            {
                user ?
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