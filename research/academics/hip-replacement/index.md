---
title: Hip Replacement Manufacturing
parent: Academic Research
grand_parent: Research
nav_order: 4
has_children: false
---

# Materials Research: Additive Manufacturing of Hip Implants

## 1. Introduction

In the world of prosthetics, such as hip implants, a single casting of parts will not suffice, as these implants need to be shaped in specific ways to account for variance in body structure of the patients these implants are for. The solution to this is to use additive manufacturing (AM), a process that builds a part by depositing layers of material on top of each other in order to create a part defined created through computer aided design techniques. This sort of manufacturing is slower than more traditional techniques like casting, rolling, or drawing metals, but AM limits the steps needed in the facility, because welding machined parts created elsewhere in the facility is not needed, and is invaluable if the part needs to be different every time, because this would require precise labor every time a new part came through the line.

## 2. Fabrication Techniques
There are multiple kinds of additive manufacturing: SLA uses photopolymer
resin, FDM uses thermoplastics, MJM uses a 3D version of FDM, 3DP uses
powder and binders, and SLS uses small particles of polymer, metal, ceramic,
or glass, and uses a laser to melt them onto the layer of material below.[1] Given that SLA, FDM, and MJM use plastics, these may not be suitable for use as hip implant material, because hip implants are traditionally made of metal (more
about that in the Material Choice section below).

## 3. Material Choice
Many factors are involved in making sure hip implants will work for their expected lifetime, including purely structural factors (creep resistance, fatigue life, yield strength, tensile strength, corrosion resistance) and biological factors (vein thrombosis, metal sensitivity and toxicity). Along with this, there are different components of the hip implant that will experience different forces: the acetabular cup, the femoral component, and the articular interface.

We will first look at the biocompatibility of the 6 suggested alloys that are used in additive manufacturing: Ti-6Al-4V, Inconel 625 (Ni-Cr alloy), Al-Si (12%Si-Al), Cu, Martensite Steel, and Stainless Steel. Ti-6Al-4V is described as bio-compatibly excellent, especially when direct contact with tissue or bone is required.[2] Ni-Cr alloys are commonly used in dental fillings, and are therefore bio-compatible.[3] In the article “Designing for Opportunity: the Aluminum Advantage,” it states that Aluminum has poor biocompatibility compared to Titanium and Stainless Steel.[4] Aluminum is reactive with other compounds, therefore, the Al-Si will not be considered, and Stainless Steel will. Pure copper is quite reactive and known to be toxic in biological systems, so it will not be considered. Finally, in “Stainless Steel – A Family of Medical Device Materials,” Austenic Steel is highlighted to have better corrosion resistance than Martensite Steel,[5] which means that Martensite Steel is less favorable. 

Now that we have narrowed our list to Ti-6Al-4V, Inconel 625, and Stainless Steel, we will determine what mechanical properties are most important to the application of hip implants. First we examine creep and fatigue: given that the human body is maintained at about 37oC with little force applied (as compared to metals) on the skeletal structure, creep and fatigue will most likely not come into play as an important factor. 

Next factor is the elastic modulus of the material, which in the paper “Microstructure and mechanical properties of open-cellular biomaterials prototypes for total knee replacement implants fabricated by electron beam melting,” it is stated that for proper bone regrowth, the elastic modulus of the material should be close to the elastic modulus of bone.[5] Given that the elastic modulus of bone is about 18-76 GPa,[8] and the elastic modulus of Ti-6Al-4V is 114 GPA,[2] Inconel 625 is 208 GPa,[7] and Stainless Steel is 180 GPa[8], these are all significantly higher than the elastic modulus of bone. The solution to this is to create a metal foam structure, thereby changing the elastic modulus of the material to match bone.[6] This procedure could be applied to any of the the three metals.

Next, because of the rotation in the joint of the acetabular cup, the next materials property we will look at is the shear modulus, which should be as high as possible to avoid corrosion. The shear modulus for the Ti-6Al-4V is 44 GPa,[2] the shear modulus for Inconel is 79 GPa,[9] and the shear modulus for Stainless Steel is 77.7 GPa.[9] Therefore, our decision is between Inconel 625 and Stainless Steel.

Next is the yield strength of the material, because the implants will functionally be ruined if they have permanent elongation caused by crossing the yield strength point. The yield strength of Inconel 625 is about 70 MPa,[7] yield strength of Stainless Steel is about 500 MPa. Therefore, Stainless Steel is the best choice for the implant. The resulting structure will be smooth Stainless Steel for the the acetabular cup and the articular interface, and for the femoral component, a Stainless Steel metal foam.

## 4. Post Treatment
In the paper “Fabrication of Ti-6Al-4V Scaffolds by Direct Metal Deposition,” parts made by additive machining are demonstrated to be very rough on the surface. Smoothing is needed for two reasons: 1) to make sure that the material does not irritate the surrounding tissues in the hip, and 2) to minimize surface angles that could lead to cracks. The process used in paper is a two-step process:

1. Sand blasting the scaffold surface, and

2. Chemical etching. 

This process should also work for the solid Stainless Steel of the cup and interface, and for the metal foam. No other processing should be required, other than possibly carburizing. That will have to be determined after some preliminary testing.

## 5. Conclusion

With better corrosion resistance, shear and elastic moduli, and biocompatibility than other metals used, along with modern property-altering manufacturing techniques, the industry standard for medical implant devices, stainless steel, still seems like the best choice despite the other alloys on the market.


## References
1. What is Additive Manufacturing?
http://additivemanufacturing.com/basics/
2. Titanium Ti-6Al-4V (Grade 5), Annealed
http://asm.matweb.com/search/SpecificMaterial.asp?bassnum=MTP641
3. Effects of surface finishing conditions on the biocompatibility of a nickelchromium dental casting alloy
http://www.ncbi.nlm.nih.gov/pubmed/21514653
4. Designing for Opportunity: the Aluminum Advantage
http://www.pfonline.com/articles/designing-for-opportunity-the-aluminumadvantage
5. Stainless Steel – A Family of Medical Device Materials
http://www.bssa.org.uk/cms/File/Medical%20Device%20Materials.pdf
6. Microstructure and mechanical properties of open-cellular biomaterials
prototypes for total knee replacement implants fabricated by electron
beam melting
7. INCONEL 625 TECHNICAL DATA
http://www.hightempmetals.com/techdata/hitempInconel625data.php
8. Modulus of Elasticity or Young’s Modulus - and Tensile Modulus for some
common Materials
http://www.engineeringtoolbox.com/young-modulus-d 417.html
9. Modulus of Rigidity for some common materials
http://www.engineeringtoolbox.com/modulus-rigidity-d 946.html
10. Fabrication of Ti-6Al-4V Scaffolds by Direct Metal Deposition
DOI: 10.1007/s11661-008-9634-y. The Minerals, Metals & Materials Society and ASM International 2008

