---
title: Origami Tesselation
parent: Academic Research
grand_parent: Research
nav_order: 9
has_children: false
---



# Contour Wrapping with Generalized Hexagonal Origami Tessellations

## Background

### Problem

Given a contour, generate an origami tessellation which has a flat folded state that follows one side of the contour, and provide the crease-patterns and animation from the flat-folded state and the flat-unfolded state. Here we present a method of solving this problem using a generalized form of the hexagonal (also known as the chicken wire) origami tessellation.

### Applications

Benefits of sheet folding are that sheet materials are inexpensive and fast to manufacture and modify. Folding sheet technology also take up little room and are light weight, making it ideal for transportation. Specific applications of contour wrapping origami are for specific shape-conforming robotic grippers.

### Hexagonal Origami Tessellations

Hexagonal Origami Tessellations (HOTs) are constructed by folding a horizontally translationally and vertically rotationally symmetric hexagonal grid. Regular Hexagonal Origami Tessellation are vertically symmetric as well, while Generalized Hexagonal Origami Tessellations (GHOTs) are not.

## Algorithms and Methods

### Input

The user inputs the contour to be followed as a Scalable Vector Graphics (SVG) file. This file must be a single contour of straight lines and quadratic Bezier curves (which will be referred to as just curves).

### Preprocessing

The goal of the preprocessing step is to convert the SVG file into a sequence of lengths $l_i$ and angles $\phi_i$, which will approximate the given contour and define the inner edge of the flat-folded tessellation.

The SVG path is converted from a sequence of lines and curves defined by complex control points to a sequence of lengths and angles between the lengths.

If the segment is a line, the length is not changed. If the segment is a curve, it is split into three lines that will constrain the contour to the inside or outside of that curve. The positioning of the three lines minimizes the area between the contour and the folded tessellation edge.

After this, all pairs of lines that meet at or close to an angle of $\pi$ are merged together. This is to avoid unnecessary creases, which become increasingly longer the closer the angle is to $\pi$.

### Edge Conversion

Because of the symmetries of the pattern, only one column of the crease pattern is needed to generate the rest. The near and far edges of the paper change sides on the as the paper folds over itself at each angle, so this gives each edge a parity, whether the given edge is on the near or far side of the paper. The conversion equation from the given edge to the near or far edge depends on the parity, the sign of the previous angle, and the sign on the next angle- eight unique edge cases in total.

### Panel Geometry

Next is to calculate the crease pattern. Again, due to symmetry, only the geometries of one column are needed to generate the rest of the crease pattern. Each crease on the column is referred to here as a hinge. The angle between the hinge and the right side of the column ($a$) can be determined from the $\phi$ angle associated with that hinge. Each geometry bounded by two sides of the column and two hinges is a panel. Each corner point of the panel is calculated from the lengths on one side of the column, the width of the column $w$, and the hinge-side angle $a$. By vertical rotation and horizontal translation, the whole crease pattern can be generated.

## Animation

We loop over the column folding angle $\theta$ from $0$ to $\pi$ and use it to get a transform object that rotates the column side from the left-hand side around the vertical axis. Next the $\sigma$ angles are calculated (equation in appendix), and converted to their own transforms. 

Next displacement transforms are made such that they temporarily translate their respective geometries to the origin so that the $\sigma$ transforms rotate each panel about their intersection with the middle crease. Starting from the bottom, each left panel is rotated around its bottom $\sigma$ hinge, and then is sequentially rotated by each lower $\sigma$. Panels on the right are transformed across each sigma, but at the opposite angle, and finally transformed about $\theta$. Finally, each transformed panel is copied and translated to form the tessellation, and a final transform is applied to move the entire tessellation.
