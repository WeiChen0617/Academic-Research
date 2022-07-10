## CS5917 Artificial Intelligence --- Dialogue Protocols for Argumentation Frameworks with Sets of Attacking Arguments
Abstract:

This application ( https://setaf-game-heroku.herokuapp.com )  is a demonstration that is part of the module CS5917: MSc Project in Artificial Intelligence on the topic of Dialogue Protocols for Argumentation Frameworks with Sets of Attacking Arguments. The paper introduces the concepts of Abstract Argumentation Frameworks (AAF) proposed by Dung and Argumentation Framework with Sets of Argument Attacking (SETAF) by Nielsen and Parsons. Proof dialogue is usually a sequence of utterances/moves between two agents: the proponent and the opponent. The proponent wants to show that an argument is justified while the opponent wants to show that it is not. A set of multiple constraints, called the protocol, is put in place to govern the behaviour of the agents, to specify who begins the dialogue and what are the conditions for the dialogue to end and to ensure the correctness of the dialogue. This application will provide three kinds of dialogue games based on SETAFs, such as Grounded Discussion Game with SETAF (SETGDG), Preferred Discussion Game with SETAF (SETPDG) and Stable Discussion Game with SETAF (SETSDG) which inspired by existing dialogue games for different syntax on AAF context.

## How to use
This app has provided four different SETAF files which could be found on the left side (Sample Input File Button). After you download the sample zip files and unzip them, please route to the demo page to get it started. The first thing you need to do is to upload one of the sample files. Finishing the file upload, you will find four parts named:

· Arguments: show the arguments after parsing.

· Relations: show the attacking relations which consist of the set of attacking arguments and the argument attacked.

· Dialogue Games: show the progress of the specified dialogue game. Users can pick one of the given arguments to interact with the computer.

· Graph: show the net of whole SETAF. Arguments, as well as the Attacks supplied by the user, are represented on a canvas using Nodes and Edges. Nodes comprise arguments and attack relations are represented using circle shapes. An attacking relation attacked by several arguments can attack one single argument. That actually means those attacking arguments attack the single argument.

## Miscellaneous
This React application whose visualization is made by react-graph-vis have been uploaded on GitHub.

Feedback ( https://docs.google.com/forms/d/e/1FAIpQLSeTtP0063ER0E6TulZgsj7fwZdKKj7r4ACbJARrPqgw3JW-Pw/viewform ) without your personal data, such as name and email, will store on Google Form. Raw data and the identity of yours will not be released to anyone. After finishing the evaluation work, data in Google Form will be get rid of.
