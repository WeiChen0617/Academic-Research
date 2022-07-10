import React from "react";
import {Link} from "react-router-dom";
import NavButton from "./Components/NavButton";
import BackgroundCard from "./Components/BackgroundCard";

export interface Props {
    name: string
}


const Home = (name: Props) => {

    return (
        <div>
            <div style={{display: 'flex', padding: '5%'}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '20%'}}>
                    <NavButton>
                        <a  href={'/samples.zip'} download>Download Sample Files</a>
                    </NavButton>
                    <NavButton>
                        <a target={"_blank"} rel="noreferrer"
                           href={'https://www.dbai.tuwien.ac.at/research/argumentation/aspartix/setaf.html'}>ASPARTIX Format for SETAF</a>
                    </NavButton>

                    <NavButton><
                        Link to={'./Dialogue'}>Start Discussion Games</Link></NavButton>

                    <NavButton>
                        <a target={"_blank"} rel="noreferrer"
                           href={'https://github.com/WeiChen0617/SETAF-Game-Heroku'}>Github</a></NavButton>

                    <NavButton>
                        <a target={"_blank"} rel="noreferrer"
                           href={'https://docs.google.com/forms/d/e/1FAIpQLSeTtP0063ER0E6TulZgsj7fwZdKKj7r4ACbJARrPqgw3JW-Pw/viewform?usp=pp_url'}>Questionnaire</a></NavButton>
                </div>
                <BackgroundCard/>
            </div>
        </div>
    )
};
export default Home
