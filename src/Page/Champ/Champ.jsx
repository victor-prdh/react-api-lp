import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Request } from "../../Helper/request";

import './Champ.css';
import Loader from "../../Component/Loader/Loader";
import Avis from '../../Component/Avis/Avis'


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
            <div className="champ-container">
            {
                champion ?
                <>
                    <img src={champion.banner} />
                    <h3>Titre: {champion.title}</h3>
                    <p>{champion.lore}</p>
                    {champion.avis && champion.avis.length > 0 ? <>
                        <h3>Avis sur le champion</h3>
                        {
                            champion.avis.map(avis =>
                                <Avis 
                                    by={avis.createdBy.firstname} 
                                    at={avis.createdAt} 
                                    content={avis.content} 
                                /> 
                            )
                        }
                        </> : <h3>Pas encore d'avis sur le champion</h3>}
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