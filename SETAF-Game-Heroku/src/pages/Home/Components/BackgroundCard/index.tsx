import React from 'react';
import 'antd/dist/antd.css';
import '../../../../index.css';
import {Card} from 'antd';


const BackgroundCard: React.FC = (props) => {
    return (
        <Card
            title='CS5917 Artificial Intelligence --- Dialogue Protocols for Argumentation Frameworks with Sets of Attacking Arguments'
            style={{width: '80%'}} {...props} >
            <h2>Abstract</h2>
            <p>This application is a demonstration that is part of the module
                <b> CS5917: MSc Project in Artificial Intelligence </b> on the topic of
                <b> Dialogue Protocols for Argumentation Frameworks with Sets of Attacking Arguments</b>. In this
                project, I will introduce the concepts of <b> Abstract Argumentation Frameworks (AAF) </b> proposed by
                Dung and
                <b> Argumentation Framework with Sets of Argument Attacking (SETAF) </b>by Nielsen and Parsons.

                Proof dialogue is usually a sequence of utterances/moves between two agents: the proponent and
                the opponent. The proponent wants to show that an argument is justified while the opponent wants to show
                that it is not. A set of multiple constraints, called the protocol, is put in place to govern the
                behaviour of the
                agents, to specify who begins the dialogue and what are the conditions for the dialogue to end and to
                ensure the correctness of the dialogue.

                Then, I will provide three different proof dialogue games based on SETAFs, such as <b> Grounded
                    Discussion Game with SETAF (SETGDG) </b>, <b> Preferred Discussion Game with SETAF
                    (SETPDG) </b> and <b> Stable Discussion Game with SETAF (SETSDG) </b>, which are inspired by the
                games for different semantics on AAF context.


            </p>

            <h2>Background</h2>

            {/*<h3>AAF:</h3>*/}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={'/images/AAF.png'} width={600}/>
            </div>
            {/*<h3>SETAF:</h3>*/}
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <img src={'/images/SETAF.png'} width={600}/>
            </div>


            {/*<h3>SETGDG:</h3>*/}
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img src={'/images/SETGDG.png'} width={600}/>
                <img src={'/images/exa_SETGDG.png'} width={600}/>

            </div>
            {/*<h3>SETPDG:</h3>*/}
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img src={'/images/SETPDG_1.png'} width={600}/>
                <img src={'/images/SETPDG_2.png'} width={600}/>
                <img src={'/images/exa_SETPDG.png'} width={600}/>
            </div>
            {/*<h3>SETSDG:</h3>*/}
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <img src={'/images/SETSDG_1.png'} width={600}/>
                <img src={'/images/SETSDG_2.png'} width={600}/>
                <img src={'/images/exa_SETSDG.png'} width={600}/>
            </div>


            <h2>How to use</h2>

            <h3>Step 1:</h3>
            <p>This app has provided four different SETAF files which could be found on the left side in this webpage
                (Sample Input
                File Button). You need to download this zip file first.
            </p>
            <img src={'/images/home1.png'} width={'65%'} style={{marginLeft: '17.5%', marginRight: '17.5%'}}/>
            <h3>Step 2:</h3>
            <p>Please go to the game page and get ready to start games.</p>
            <img src={'/images/home2.png'} width={'65%'} style={{marginLeft: '17.5%', marginRight: '17.5%'}}/>

            <h3>Step 3:</h3>
            <p>Welcome to the game page. Before you start your gaming experience, please upload one of the sample files
                you downloaded before. (Upload Button)</p>
            <img src={'/images/dialogue1.png'} width={'65%'} style={{marginLeft: '17.5%', marginRight: '17.5%'}}/>

            <h3>Step 4:</h3>
            <p>
                Finishing the file upload, you will find five parts named:
                <dd><b>· Arguments(Zoom 1): </b> show the arguments after parsing. </dd>
                <dd><b>· Relations(Zoom 2): </b> show the attacking relations which consist of the set of attacking
                    arguments and the argument attacked.
                </dd>
                <dd><b>· Game selector(Zoom 3): </b> is a selector to switch types of games.
                </dd>
                <dd><b>· Dialogue Games(Zoom 4): </b> show the progress of the specified dialogue game. Users can pick
                    one of the given arguments to interact with the computer.
                </dd>
                <dd><b>· Graph(Zoom 5): </b> show the net of whole SETAF. Arguments, as well as the Attacks supplied by
                    the user, are represented on a canvas using Nodes and Edges. Nodes comprise arguments and attack
                    relations are represented using circle shapes. An attacking relation attacked by several arguments
                    can attack one single argument. That actually means those attacking arguments attack the single
                    argument.
                </dd>
            </p>
            <img src={'/images/dialogue2.png'} width={'65%'} style={{marginLeft: '17.5%', marginRight: '17.5%'}}/>

            <h3>Step 5:</h3>
            <p>As you have know all the attacking relationship in this SETAF (it is convenient and helpful to find any
                relationship in graph), Let's play a game then. In games, you would be asked to be a PRO role to show an
                argument is justified. As a beginning, you need to choose one argument to start the game.</p>

            <img src={'/images/dialogue3.png'} width={'65%'} style={{marginLeft: '17.5%', marginRight: '17.5%'}}/>
            <p>Then, you will see the process of the game. Computer will play as OPP role to refute your argument is
                unjustified. After every OPP moves, you will given some available defender to support your argument is
                justified. The game will terminate when it meet the game protocols. At the same time, you will see the
                result
                whether your argument is justified.</p>
            <img src={'/images/dialogue4.png'} width={'65%'} style={{marginLeft: '17.5%', marginRight: '17.5%'}}/>


            <h2>Miscellaneous</h2>
            <p>
                This React application whose visualization is made by
                <a href={'https://github.com/crubier/react-graph-vis'}> react-graph-vis</a> have been uploaded on
                <a href={'https://github.com/WeiChen0617/SETAF-Game-Heroku'}> GitHub</a>.
            </p>
            <p>
                <a href={'https://docs.google.com/forms/d/e/1FAIpQLSeTtP0063ER0E6TulZgsj7fwZdKKj7r4ACbJARrPqgw3JW-Pw/viewform?usp=pp_url'}>Feedback</a> without
                your personal data, such as name and email, will store on Google Form. Raw data and the
                identity of yours will not be released to anyone. After finishing the evaluation work, data in Google
                Form will be get rid of.
            </p>

        </Card>
    )
};

export default BackgroundCard


