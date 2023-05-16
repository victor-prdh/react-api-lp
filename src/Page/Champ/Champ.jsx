import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Request } from "../../Helper/request";

import './Champ.css';
import Loader from "../../Component/Loader/Loader";


const ChampPage = () => {
    const navigate = useNavigate()
    const {id} = useParams();
    const [champion, setChampion] = useState(null)

    useEffect(() => {
        const getChamp = async () => {
            await Request('http://localhost:8000/api/champions/'.concat(id), setChampion, navigate)
        }
        getChamp()
    },[])

    return (
        <div>
            <h1>{id}</h1>
            <Link to={'/'}>Home</Link> / 
            <Link to={'/login'}>Profil</Link>
            <br />
            <div className="container">
            {
                champion ?
                <>
                    <img src={champion.banner} />
                    <h3>Titre: {champion.title}</h3>
                    <p>{champion.lore}</p>
                </>
                : 
                <div style={{width: '100%', alignItems: 'center', justifyContent: "center", display: "flex"}}>
                    <Loader />
                </div>
            }
            </div>
        </div>
    )
}

export default ChampPage;