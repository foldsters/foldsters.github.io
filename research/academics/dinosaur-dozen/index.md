---
title: Datasaurus Dozen
parent: Academic Research
nav_order: 5
grand_parent: Research
has_children: false
---


# Datasaurus Dozen Particle Distributions


The goal of this short demo is to explore the Datasaurus Dozen dataset, a dataset famous for having different distributions with the same statistical properties, with a technique from analyzing particle distributions: the pair distribution function. The pair distribution function is rotation and translation invariant, while most of the stats measured of these plots are not, so it is interesting to see which pair distribution plots look similar.


## Pair Distribution Plot


```python
import pandas
from IPython.display import display
from ggplot import *
from math import hypot, atan2
import numpy as np

data_dict = dict(tuple(pandas.read_csv('DatasaurusDozen.tsv', sep='\t').groupby('dataset')))

data_dict

for title, frame in data_dict.items():
    plot = ggplot(aes(x='x', y='y'), data=frame) + \
    geom_point()
    
    display(title)
    display(plot)
```


    'away'



![png](output_1_1.png)






    'bullseye'



![png](output_1_4.png)







    'circle'



![png](output_1_7.png)







    'dino'



![png](output_1_10.png)







    'dots'



![png](output_1_13.png)







    'h_lines'



![png](output_1_16.png)







    'high_lines'



![png](output_1_19.png)







    'slant_down'



![png](output_1_22.png)







    'slant_up'



![png](output_1_25.png)







    'star'



![png](output_1_28.png)







    'v_lines'



![png](output_1_31.png)







    'wide_lines'



![png](output_1_34.png)







    'x_shape'



![png](output_1_37.png)






## XY Pairs


```python
for title, frame in data_dict.items():

    length = []
    
    for x0, y0 in zip(frame.x.tolist(), frame.y.tolist()):
        for x1, y1 in zip(frame.x.tolist(), frame.y.tolist()):
            r = hypot(x1-x0, y1-y0)
            length.append(r)
    data = pandas.DataFrame({'length': length})
    plot = ggplot(aes(x='length'), data=data) + geom_histogram(binwidth=1)
    display(title)
    display(plot)

    
```


    'away'



![png](output_3_1.png)







    'bullseye'



![png](output_3_4.png)







    'circle'



![png](output_3_7.png)







    'dino'



![png](output_3_10.png)







    'dots'



![png](output_3_13.png)







    'h_lines'



![png](output_3_16.png)







    'high_lines'



![png](output_3_19.png)







    'slant_down'



![png](output_3_22.png)







    'slant_up'



![png](output_3_25.png)







    'star'



![png](output_3_28.png)







    'v_lines'



![png](output_3_31.png)







    'wide_lines'



![png](output_3_34.png)







    'x_shape'



![png](output_3_37.png)


