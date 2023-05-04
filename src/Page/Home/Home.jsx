import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Request } from "../../Helper/request";


const HomePage = () => {
    const navigate = useNavigate()
    const [champ, setChamp] = useState(null)

    useEffect(() => {
        const getChamp = async () => {
            await Request('http://localhost:8000/api/champions', setChamp, navigate)
        }
        getChamp()
    },[])
        
    console.log(champ);
    return (
        <div>
            <h1>Hello</h1>
            <Link to={'/login'}>Login</Link>
            <br />
            Champions: {champ ? 'oui' : 'non'}
        </div>
    )
}

export default HomePage;