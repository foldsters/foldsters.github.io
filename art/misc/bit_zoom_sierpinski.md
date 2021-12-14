---
layout: default
title: Bit Zoom Sierpinski
nav_exclude: true
---

# Imports


```python
from PIL import Image
import numpy as np
from IPython.display import display, clear_output
from time import sleep
import imageio

def show(img_array, clear=True, save=None, resize=None, mode=0):
    img = Image.fromarray(img_array.astype(np.uint8))
    if resize is not None:
        img = img.resize((resize, resize), mode)
    display(img)
    
    if clear:
        clear_output(wait=True)
    if save is not None:
        img.save(save+".png")
    return img
```

# Float Binary Encoding and & Operation


```python
def float_encode_array(n, p):
    i, f = divmod(n, 1)
    d = 1
    t = []
    for s in range(p):
        if f >= 0.5:
            t.append(1)
            f = 2*f - 1
        else:
            f *= 2
            t.append(0)
        d *= 2
    return [int(i)] + t

def float_and_array(n1, n2, p1):
    f1 = float_encode_array(n1, p1)
    f2 = float_encode_array(n2, p1)
    result = []
    and_array = [f1[p] & f2[p] for p in range(p1)]
    for p in range(p1):
        result.append(1-any(and_array[:p]))
    return result
```

# Zooming and Blending


```python
def bit_color(cx, cy, x, y, i, z):
    l = 0.5
    zoom = z**i
    fx = cx + x*zoom
    fy = cy + y*zoom
    depth = np.log2(1/zoom)
    di, df = divmod(depth, 1)
    di = int(di)
    totals = float_and_array(fx, fy, di+3)
    total = totals[0]
    for t in totals[1:-1]:
        total = total*(1-l) + t*l
    total = total*(1-l*df) + totals[-1]*l*df
    return total
```

# Drawing to an Image


```python
cx = 128
cy = 128

z = 0.75**(1/3)

for i in range(0, 128):
    
    image_array = np.zeros((256, 256, 3), dtype=np.uint8)

    for x in range(-128, 128):
        for y in range(-128, 128):

            c = bit_color(cx, cy, x, y, i, z)
            image_array[x+128, y+128] = 255*c

    show(image_array, save=f'anim7/{i}')
```

# Saving as GIF


```python
files = [imageio.imread(f'anim7/{frame}.png') for frame in range(128)]
imageio.mimsave(f"zoom_tri.gif", files, fps=24)
```
