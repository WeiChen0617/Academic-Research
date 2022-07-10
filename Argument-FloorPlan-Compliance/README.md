# Overview
This whole project sought to investigate whether a computer-based system could be used to identify whether a building floorplan was compliant with building regulations and to allow users to understand why this was or was not the case. The complete source code is shown in the repository (https://github.com/Vladimyr23/Floor_Plan_Compliance). However, two kinds of argument reasoners and explanatory dialogue were only shown in this repository.
# System Design
As shown below, it provides a high-level overview of the delivered system, with the feature detector and reasoner forming the heart of the research. 
<div align=center>
<img src="https://user-images.githubusercontent.com/88118091/157868675-70df8956-b953-4725-aa2a-24f4298e2b03.png" width="650" height="450" alt="Figure 1"/><br/>
</div>
As input, the feature detector takes in an image (See below as an example). As output, the detector provides a list of features and their position.
<div align=center>
<img src="https://user-images.githubusercontent.com/88118091/157939766-4cd2c3fe-3a0a-42b6-98eb-6b96b6cad6db.png" width="450" height="300" alt="Figure 2"/><br/>
</div>
The reasoner encodes building design regulations in a machine-understandable format. Given the feature list from the detector, the reasoner is then able to determine whether these features do, or do not comply with the regulations.
