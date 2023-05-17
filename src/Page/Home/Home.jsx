import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Request } from "../../Helper/request";
import Card from "../../Component/Card/Card"

import './Home.css';
import Loader from "../../Component/Loader/Loader";


const HomePage = () => {
    const navigate = useNavigate()
    const [champ, setChamp] = useState(null)

    useEffect(() => {
        const getChamp = async () => {
            await Request({url: 'http://localhost:8000/api/champions', set: setChamp, navigate: navigate})
        }
        getChamp()
    },[])

    return (
        <div>
            <h1>Champs</h1>
            <Link to={'/login'}>Profil</Link>
            <br />
            <div className="container">
            {
                champ ?
                champ.map(champion => 
                    <Card key={champion.id} image={champion.banner} title={champion.name} desc={champion.lore.substring(0, 120).concat('...')} link={'champion/'.concat(champion.id)} />
                )
                : 
                <div style={{width: '100%', alignItems: 'center', justifyContent: "center", display: "flex"}}>
                    <Loader />
                </div>
            }
            </div>
        </div>
    )
}

export default HomePage;