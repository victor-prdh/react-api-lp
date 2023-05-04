import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Request } from "../../Helper/request";
import Card, {card} from "../../Component/Card/Card"

import './Home.css';


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
            <div className="container">
            {
                champ ?
                champ.map(champion => <Card image={champion.banner} title={champion.name} desc={champion.lore} />)
                : 'Pas de champions'
            }
            </div>
        </div>
    )
}

export default HomePage;