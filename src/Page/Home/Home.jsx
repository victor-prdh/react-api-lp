import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const HomePage = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null)

    useEffect(() => {
        const checkUser = async() => {
            var user = localStorage.getItem('user');
            if (!user) {
                console.log('login');
                navigate('/login')
            } else {
                user = await JSON.parse(user);
                console.log(user);
                setUser(user)
            }
        }

        checkUser()
    } , [])

    return(
        <div>
            
        </div>
    )
}

export default HomePage;