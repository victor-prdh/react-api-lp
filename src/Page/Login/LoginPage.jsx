import LoginForm from "../../Component/LoginForm/LoginForm";
import {useState} from "react";


const LoginPage = () => {

    const [ formSubmitting, setFormSubmitting ] = useState(false);
    const handleSubmit = async (credentials) => {
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

    const saveUserData = async (token) => {
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
                    console.log(data);
                    localStorage.setItem('user', data);
                    console.log('USER SAVED');
                } else {
                    alert('Erreur lors de la récupération des datas de l\'utilisateur')
                }
            });
        } catch (error) {
            console.log(error);
            alert('Erreur lors de la connexion')
        }
    };

    return(
        <div>

            <LoginForm
                handleSubmit={handleSubmit}
            />

        </div>
    )
}

export default LoginPage;