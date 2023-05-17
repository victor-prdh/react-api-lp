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
    const [avis, setAvis] = useState(null)
    const [avisLoading, setAvisLoading] = useState(null)
    const [avisUser, setAvisUser] = useState(null)
    const [avisError, setAvisError] = useState(null)
    const [avisSuccess, setAvisSuccess] = useState(null)
    

    const  handleChange = (event) => {
        if (event.target.value.length >= 255) {
            setAvisError('Votre avis ne peut pas dépasser 255 chars')
        }
        else {
            setAvisUser(event.target.value)
            setAvisError(null)
        }
	};

    const handleAvis = async (event) => {
        event.preventDefault()
        if (avisUser === null || avisUser === '') {
            return setAvisError('Votre avis ne doit pas être vide')
        }
        if (avisError !== null) {
            return
        }

        var body = {content: avisUser, champion: '/api/champions/'.concat(champion.id)}
        var data = await Request({url: 'http://localhost:8000/api/avis', body: body, navigate: navigate})
        

        if (data.id) {
            setAvisLoading(true)
            setAvisUser(null)
            setAvisError(null)
            setAvisSuccess('Votre avis vient d\'être créé')
            await Request({url:'http://localhost:8000/api/avis?champion.lolId='.concat(id), set:setAvis, navigate:navigate})
            setAvisLoading(false)
        }
    }

    useEffect(() => {
        const getChamp = async () => {
            await Request({url:'http://localhost:8000/api/champions/'.concat(id), set:setChampion, navigate:navigate})
        }
        getChamp()
    },[])

    useEffect(() => {
        setAvis(champion?.avis)
        setAvisLoading(false)
    },[champion])

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

                    <div className="avis-form">
                        <h3>Écrire un avis</h3>
                        <p className="text-success">{avisSuccess}</p>
                        <hr />
                        <form id="avisForm" onSubmit={handleAvis}>
                            <textarea name="avis" id="avis" cols="30" rows="10" value={avisUser} onChange={handleChange}></textarea>
                            <p className="text-error">{avisError}</p>

                            <input type="submit" value="Ajouter mon avis" onClick={handleAvis} />
                        </form>
                    </div>

                    {avisLoading ?  <Loader/>:
                    avis && avis.length > 0 ? <>
                        <h3>Avis sur le champion</h3>
                        {
                            avis.map(avis =>
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