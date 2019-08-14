---
title: Exact Cover
parent: Independent Research
grand_parent: Research
nav_order: 1
has_children: false
---


# Tone Row Chord Progressions as an Exact Cover Problem with Preference

## Abstract

In this paper, we present a solution to a unique variation of the exact cover problem, in which some solutions are preferred over others. By modifying the standard algorithm for solving exact cover problems, we achieve an algorithm that returns solutions to the exact cover problem in order of preference, which will reduce the number of computations if only the best solutions are needed. This algorithm is then applied to finding solutions to the 12 tone row chord progression problem, in which the octave of 12 notes is partitioned into 4 major or minor chords.

## Introduction

### Exact Cover Problems

Suppose we have a set of sets S and a desired set D. A solution to the exact cover problem S' is a subset of S such that the intersection of any two elements is empty and the union of all the elements is D. Examples of problems that can naturally be modeled as exact cover problems are the grid-based tiling puzzles, such as the pentomino tiling problem and sudoku, and with some generalization, the N-Queens problem. This type of problem is NP-Complete, which means that there's no deterministic way that we know of to efficiently find solutions to this problem in polynomial time, but checking if a pre-generated solution is valid is less complex. Despite this, there's still an elegant algorithm to solve these types of problems known as Knuth's Algorithm X.

### 12 Tone Rows

The original 12 tone row problem is to create an aesthetically pleasing melody that uses all twelve notes in an octave before moving on to the next section, except for optionally repeating a note in place. An interesting variation of this problem is to consider a tone row 4-chord progression, in which the octave is partitioned into 4 3-note chords. For the purposes of this paper, we will consider only major chords, minor chords, and their inversions.

### Objective

The 12 tone row chord progression problem can be reduced to an exact cover problem; however, we lose any aesthetic properties that one progression may have over another. We will preserve this property by giving every possible chord progression a score (whether it satisfies the exact cover or not) with a cost function that satisfies a few properties, and a modification of Knuth's Algorithm X that explores the search tree of partial solutions using the path finding algorithm A*, replacing the recursive, backtracking nature of Algorithm X with a priority queue and cost function.

## Algorithms and Methods

### Knuth's Algorithm X

For the purposes of of the implementation in this paper, we will explain Algorithm X in terms of chords filling the octave.

First each chord is represented as an array of binary values based on the notes it occupies. Our octave starts at C, so the C major (notes C, E, D) and F minor (notes F, G#, C) chords would be represented as:

Chord     | C  | C# | D | D# | E | F | F# | G | G# | A | A# | B
----------|----|----|---|----|---|---|----|---|----|---|----|----
C Major   | 1  | 0  | 0 | 0  | 1 | 0 | 0  | 1 | 0  | 0 | 0  | 0
F Minor   | 1  | 0  | 0 | 0  | 0 | 1 | 0  | 0 | 1  | 0 | 0  | 0

The chords naturally form a table. We select the column that has the least number of `1`s. All solutions require exactly one of the chords that have a note in this column, so we can branch the search space by these chords. To select a chord, add the chord to a running partial solution set, remove the note columns that the chord notes are in, and remove all chords that have any notes in those columns as well, since those chords cannot be in the same solution as the selected chord. This produces a smaller table in which more selections can take place. If a selection produces a table with no columns, then the running partial solution is a valid solution to the exact cover problem. If no more selections can take place, the last selected chord in the running partial solution is removed, and the table reverts back to the previous state. If there is no previous state, the algorithm returns all of the valid solutions. Thus, Algorithm X is a backtracking depth-first searching algorithm that finds all solutions to the exact cover problem.

### Algorithm X*

We give the modification of Knuth's Algorithm X the name X*. The algorithm looks for solutions to the exact cover problem in order of some cost function that is passed in along with the initial table. It will also act as a generator, yielding results sequentially so the algorithm can be terminated early if only the best solutions are desired.

Instead of working depth first, A* works as a best-first search algorithm. The algorithm begins the same way as Algorithm X, but instead of immediately selecting the first viable chord and exploring that branch, each chord is added to a copy of the running partial solution, the costs of these possible running partial solutions are calculated, and the cost-path pairs are added to a min-priority queue. Then the algorithm pops the next path off the queue, collapses the path into a single *superchord*, and uses this as the selected chord. As before, if the selection process produces a zero column table, then that path is a solution to the exact cover problem, and it is yielded from the algorithm. The algorithm continues until the priority queue is empty.

The X* algorithm I have included in this program also has additional optional parameters for the generalized exact cover problem, but that is outside of the problem posed in this paper.

### Cost Function

Every subset P of S should be associated with a cost such that:

* The cost of P is a positive float, and

* Subsets of P have a lesser or equal value to P

For the purposes of assigning an aesthetic cost to a set of chords, we turn to Neo-Riemannian music theory. For every major or minor chord in the octave, three other major or minor chords can be made by moving only one of three notes in the chord to a different position. The cost of a two-chord set is the minimum number of these moves it takes to move from one of the chords to the other. The cost of n-chord sets is the sum of all of the costs of the two-chord sets that can be constructed from that set. Additionally, an extra cost may be added for the position (root, 1st inversion, 2nd inversion) of the chords in the chord set. We have decided to add on two cost points for each chord in the root position, and one point for each chord in the 1st inversion. Interestingly enough, this addition to the cost function breaks the 12-fold rotational symmetry present in the other costs, and produces one best solution to the exact cover problem with a cost of 23: F Major, C# Minor, G Minor, and B Major.

# Program

## Resources


```python
import numpy as np
import pandas as pd
from collections import deque
from queue import PriorityQueue
from itertools import combinations
from IPython.display import display
```

## Chord Table


```python
note_names = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
```


```python
def rotations(seq, length, wrap=True):
    results = []
    seq_padded = seq + [0]*(length - len(seq))
    d = deque(seq_padded)
    for i in range(length):
        results.append(list(d))
        if not wrap and d[-1] != 0:
            return results
        d.rotate()
    return results

chord_configs = {5: [1, 0, 0, 0, 1, 0, 0, 1],
                 4: [1, 0, 0, 1, 0, 0, 0, 1]}

chord_rotations = sum([rotations(v, 12) for k, v in chord_configs.items()], [])
chord_rotations
```




    [[1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
     [0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
     [0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0],
     [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0],
     [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1],
     [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0],
     [0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
     [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
     [1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0],
     [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
     [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0],
     [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
     [1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
     [0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
     [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
     [0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0],
     [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1],
     [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
     [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0],
     [0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0],
     [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1],
     [1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
     [0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
     [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1]]




```python
def to_table(data, index=None):
    return pd.DataFrame.from_records(np.array(data, dtype=bool), index=index)

chord_names = note_names + [note_name + 'm' for note_name in note_names]

chord_table = to_table(chord_rotations, chord_names)
chord_table
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>0</th>
      <th>1</th>
      <th>2</th>
      <th>3</th>
      <th>4</th>
      <th>5</th>
      <th>6</th>
      <th>7</th>
      <th>8</th>
      <th>9</th>
      <th>10</th>
      <th>11</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>C</th>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>C#</th>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>D</th>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>D#</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>E</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>F</th>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>F#</th>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>G</th>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>G#</th>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>A</th>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>A#</th>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>B</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>Cm</th>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>C#m</th>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>Dm</th>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>D#m</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>Em</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>Fm</th>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>F#m</th>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>Gm</th>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>G#m</th>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
    <tr>
      <th>Am</th>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
    </tr>
    <tr>
      <th>A#m</th>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
    </tr>
    <tr>
      <th>Bm</th>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>False</td>
      <td>True</td>
    </tr>
  </tbody>
</table>
</div>



## Cost Function


```python
fifths = [note_names[(i*7 + j)%12]+m for i in range(12) for j, m in ((0, ''), (4, 'm'))]

print(fifths)
```

    ['C', 'Em', 'G', 'Bm', 'D', 'F#m', 'A', 'C#m', 'E', 'G#m', 'B', 'D#m', 'F#', 'A#m', 'C#', 'Fm', 'G#', 'Cm', 'D#', 'Gm', 'A#', 'Dm', 'F', 'Am']
    


```python
chord_steps = {fifths[c]: {fifths[c-23], fifths[c-1], fifths[c-17 if 'm' in fifths[c] else c-7]} for c in range(24)}
chord_steps
```




    {'C': {'Am', 'Cm', 'Em'},
     'Em': {'C', 'E', 'G'},
     'G': {'Bm', 'Em', 'Gm'},
     'Bm': {'B', 'D', 'G'},
     'D': {'Bm', 'Dm', 'F#m'},
     'F#m': {'A', 'D', 'F#'},
     'A': {'Am', 'C#m', 'F#m'},
     'C#m': {'A', 'C#', 'E'},
     'E': {'C#m', 'Em', 'G#m'},
     'G#m': {'B', 'E', 'G#'},
     'B': {'Bm', 'D#m', 'G#m'},
     'D#m': {'B', 'D#', 'F#'},
     'F#': {'A#m', 'D#m', 'F#m'},
     'A#m': {'A#', 'C#', 'F#'},
     'C#': {'A#m', 'C#m', 'Fm'},
     'Fm': {'C#', 'F', 'G#'},
     'G#': {'Cm', 'Fm', 'G#m'},
     'Cm': {'C', 'D#', 'G#'},
     'D#': {'Cm', 'D#m', 'Gm'},
     'Gm': {'A#', 'D#', 'G'},
     'A#': {'A#m', 'Dm', 'Gm'},
     'Dm': {'A#', 'D', 'F'},
     'F': {'Am', 'Dm', 'Fm'},
     'Am': {'A', 'C', 'F'}}




```python
t = []
for C in fifths:
    seen_set = {C}
    q = [{C}]
    i = 1
    t.append(((C, C), 0))
    while len(seen_set) != 24:
        q.append(set())
        for c in q[-2]:
            for p in chord_steps[c]:
                if p not in seen_set:
                    seen_set.add(p)
                    q[-1].add(p)
                    t.append(((C, p), i))
        i += 1
        
chord_distances = dict(t)
chord_distances
```




    {('C', 'C'): 0,
     ('C', 'Em'): 1,
     ('C', 'Cm'): 1,
     ('C', 'Am'): 1,
     ('C', 'E'): 2,
     ('C', 'G'): 2,
     ('C', 'D#'): 2,
     ('C', 'G#'): 2,
     ('C', 'F'): 2,
     ('C', 'A'): 2,
     ('C', 'Fm'): 3,
     ('C', 'Dm'): 3,
     ('C', 'D#m'): 3,
     ('C', 'Gm'): 3,
     ('C', 'G#m'): 3,
     ('C', 'Bm'): 3,
     ('C', 'C#m'): 3,
     ('C', 'F#m'): 3,
     ('C', 'A#'): 4,
     ('C', 'C#'): 4,
     ('C', 'F#'): 4,
     ('C', 'D'): 4,
     ('C', 'B'): 4,
     ('C', 'A#m'): 5,
     ('Em', 'Em'): 0,
     ('Em', 'E'): 1,
     ('Em', 'C'): 1,
     ('Em', 'G'): 1,
     ('Em', 'Bm'): 2,
     ('Em', 'Gm'): 2,
     ('Em', 'Cm'): 2,
     ('Em', 'Am'): 2,
     ('Em', 'C#m'): 2,
     ('Em', 'G#m'): 2,
     ('Em', 'A#'): 3,
     ('Em', 'D#'): 3,
     ('Em', 'A'): 3,
     ('Em', 'C#'): 3,
     ('Em', 'G#'): 3,
     ('Em', 'B'): 3,
     ('Em', 'D'): 3,
     ('Em', 'F'): 3,
     ('Em', 'A#m'): 4,
     ('Em', 'Dm'): 4,
     ('Em', 'Fm'): 4,
     ('Em', 'F#m'): 4,
     ('Em', 'D#m'): 4,
     ('Em', 'F#'): 5,
     ('G', 'G'): 0,
     ('G', 'Em'): 1,
     ('G', 'Bm'): 1,
     ('G', 'Gm'): 1,
     ('G', 'E'): 2,
     ('G', 'C'): 2,
     ('G', 'D'): 2,
     ('G', 'B'): 2,
     ('G', 'A#'): 2,
     ('G', 'D#'): 2,
     ('G', 'A#m'): 3,
     ('G', 'Dm'): 3,
     ('G', 'Cm'): 3,
     ('G', 'Am'): 3,
     ('G', 'F#m'): 3,
     ('G', 'D#m'): 3,
     ('G', 'G#m'): 3,
     ('G', 'C#m'): 3,
     ('G', 'F#'): 4,
     ('G', 'A'): 4,
     ('G', 'C#'): 4,
     ('G', 'G#'): 4,
     ('G', 'F'): 4,
     ('G', 'Fm'): 5,
     ('Bm', 'Bm'): 0,
     ('Bm', 'D'): 1,
     ('Bm', 'B'): 1,
     ('Bm', 'G'): 1,
     ('Bm', 'Dm'): 2,
     ('Bm', 'F#m'): 2,
     ('Bm', 'G#m'): 2,
     ('Bm', 'D#m'): 2,
     ('Bm', 'Em'): 2,
     ('Bm', 'Gm'): 2,
     ('Bm', 'A#'): 3,
     ('Bm', 'D#'): 3,
     ('Bm', 'F#'): 3,
     ('Bm', 'A'): 3,
     ('Bm', 'G#'): 3,
     ('Bm', 'E'): 3,
     ('Bm', 'C'): 3,
     ('Bm', 'F'): 3,
     ('Bm', 'A#m'): 4,
     ('Bm', 'Fm'): 4,
     ('Bm', 'Am'): 4,
     ('Bm', 'Cm'): 4,
     ('Bm', 'C#m'): 4,
     ('Bm', 'C#'): 5,
     ('D', 'D'): 0,
     ('D', 'Bm'): 1,
     ('D', 'Dm'): 1,
     ('D', 'F#m'): 1,
     ('D', 'B'): 2,
     ('D', 'G'): 2,
     ('D', 'A#'): 2,
     ('D', 'F'): 2,
     ('D', 'F#'): 2,
     ('D', 'A'): 2,
     ('D', 'Gm'): 3,
     ('D', 'A#m'): 3,
     ('D', 'Fm'): 3,
     ('D', 'Am'): 3,
     ('D', 'G#m'): 3,
     ('D', 'D#m'): 3,
     ('D', 'Em'): 3,
     ('D', 'C#m'): 3,
     ('D', 'D#'): 4,
     ('D', 'C#'): 4,
     ('D', 'G#'): 4,
     ('D', 'E'): 4,
     ('D', 'C'): 4,
     ('D', 'Cm'): 5,
     ('F#m', 'F#m'): 0,
     ('F#m', 'F#'): 1,
     ('F#m', 'A'): 1,
     ('F#m', 'D'): 1,
     ('F#m', 'A#m'): 2,
     ('F#m', 'D#m'): 2,
     ('F#m', 'C#m'): 2,
     ('F#m', 'Am'): 2,
     ('F#m', 'Bm'): 2,
     ('F#m', 'Dm'): 2,
     ('F#m', 'A#'): 3,
     ('F#m', 'C#'): 3,
     ('F#m', 'E'): 3,
     ('F#m', 'B'): 3,
     ('F#m', 'G'): 3,
     ('F#m', 'D#'): 3,
     ('F#m', 'F'): 3,
     ('F#m', 'C'): 3,
     ('F#m', 'Gm'): 4,
     ('F#m', 'Fm'): 4,
     ('F#m', 'Em'): 4,
     ('F#m', 'Cm'): 4,
     ('F#m', 'G#m'): 4,
     ('F#m', 'G#'): 5,
     ('A', 'A'): 0,
     ('A', 'C#m'): 1,
     ('A', 'Am'): 1,
     ('A', 'F#m'): 1,
     ('A', 'C#'): 2,
     ('A', 'E'): 2,
     ('A', 'F#'): 2,
     ('A', 'D'): 2,
     ('A', 'F'): 2,
     ('A', 'C'): 2,
     ('A', 'Fm'): 3,
     ('A', 'Dm'): 3,
     ('A', 'A#m'): 3,
     ('A', 'Em'): 3,
     ('A', 'Cm'): 3,
     ('A', 'Bm'): 3,
     ('A', 'G#m'): 3,
     ('A', 'D#m'): 3,
     ('A', 'G#'): 4,
     ('A', 'A#'): 4,
     ('A', 'B'): 4,
     ('A', 'G'): 4,
     ('A', 'D#'): 4,
     ('A', 'Gm'): 5,
     ('C#m', 'C#m'): 0,
     ('C#m', 'A'): 1,
     ('C#m', 'C#'): 1,
     ('C#m', 'E'): 1,
     ('C#m', 'Am'): 2,
     ('C#m', 'F#m'): 2,
     ('C#m', 'A#m'): 2,
     ('C#m', 'Fm'): 2,
     ('C#m', 'Em'): 2,
     ('C#m', 'G#m'): 2,
     ('C#m', 'F#'): 3,
     ('C#m', 'D'): 3,
     ('C#m', 'A#'): 3,
     ('C#m', 'G#'): 3,
     ('C#m', 'B'): 3,
     ('C#m', 'F'): 3,
     ('C#m', 'C'): 3,
     ('C#m', 'G'): 3,
     ('C#m', 'Gm'): 4,
     ('C#m', 'Dm'): 4,
     ('C#m', 'Cm'): 4,
     ('C#m', 'Bm'): 4,
     ('C#m', 'D#m'): 4,
     ('C#m', 'D#'): 5,
     ('E', 'E'): 0,
     ('E', 'C#m'): 1,
     ('E', 'Em'): 1,
     ('E', 'G#m'): 1,
     ('E', 'C'): 2,
     ('E', 'G'): 2,
     ('E', 'A'): 2,
     ('E', 'C#'): 2,
     ('E', 'G#'): 2,
     ('E', 'B'): 2,
     ('E', 'A#m'): 3,
     ('E', 'Fm'): 3,
     ('E', 'Cm'): 3,
     ('E', 'Am'): 3,
     ('E', 'Bm'): 3,
     ('E', 'D#m'): 3,
     ('E', 'Gm'): 3,
     ('E', 'F#m'): 3,
     ('E', 'A#'): 4,
     ('E', 'D#'): 4,
     ('E', 'F#'): 4,
     ('E', 'D'): 4,
     ('E', 'F'): 4,
     ('E', 'Dm'): 5,
     ('G#m', 'G#m'): 0,
     ('G#m', 'G#'): 1,
     ('G#m', 'B'): 1,
     ('G#m', 'E'): 1,
     ('G#m', 'Fm'): 2,
     ('G#m', 'Cm'): 2,
     ('G#m', 'Bm'): 2,
     ('G#m', 'D#m'): 2,
     ('G#m', 'C#m'): 2,
     ('G#m', 'Em'): 2,
     ('G#m', 'A'): 3,
     ('G#m', 'C#'): 3,
     ('G#m', 'D'): 3,
     ('G#m', 'G'): 3,
     ('G#m', 'F#'): 3,
     ('G#m', 'D#'): 3,
     ('G#m', 'C'): 3,
     ('G#m', 'F'): 3,
     ('G#m', 'Dm'): 4,
     ('G#m', 'Am'): 4,
     ('G#m', 'A#m'): 4,
     ('G#m', 'F#m'): 4,
     ('G#m', 'Gm'): 4,
     ('G#m', 'A#'): 5,
     ('B', 'B'): 0,
     ('B', 'Bm'): 1,
     ('B', 'G#m'): 1,
     ('B', 'D#m'): 1,
     ('B', 'D'): 2,
     ('B', 'G'): 2,
     ('B', 'F#'): 2,
     ('B', 'D#'): 2,
     ('B', 'G#'): 2,
     ('B', 'E'): 2,
     ('B', 'Dm'): 3,
     ('B', 'F#m'): 3,
     ('B', 'Gm'): 3,
     ('B', 'Cm'): 3,
     ('B', 'Fm'): 3,
     ('B', 'C#m'): 3,
     ('B', 'Em'): 3,
     ('B', 'A#m'): 3,
     ('B', 'A#'): 4,
     ('B', 'A'): 4,
     ('B', 'C#'): 4,
     ('B', 'F'): 4,
     ('B', 'C'): 4,
     ('B', 'Am'): 5,
     ('D#m', 'D#m'): 0,
     ('D#m', 'F#'): 1,
     ('D#m', 'D#'): 1,
     ('D#m', 'B'): 1,
     ('D#m', 'A#m'): 2,
     ('D#m', 'F#m'): 2,
     ('D#m', 'Gm'): 2,
     ('D#m', 'Cm'): 2,
     ('D#m', 'Bm'): 2,
     ('D#m', 'G#m'): 2,
     ('D#m', 'A#'): 3,
     ('D#m', 'G'): 3,
     ('D#m', 'A'): 3,
     ('D#m', 'D'): 3,
     ('D#m', 'C#'): 3,
     ('D#m', 'G#'): 3,
     ('D#m', 'E'): 3,
     ('D#m', 'C'): 3,
     ('D#m', 'Dm'): 4,
     ('D#m', 'C#m'): 4,
     ('D#m', 'Fm'): 4,
     ('D#m', 'Em'): 4,
     ('D#m', 'Am'): 4,
     ('D#m', 'F'): 5,
     ('F#', 'F#'): 0,
     ('F#', 'A#m'): 1,
     ('F#', 'D#m'): 1,
     ('F#', 'F#m'): 1,
     ('F#', 'A#'): 2,
     ('F#', 'C#'): 2,
     ('F#', 'D#'): 2,
     ('F#', 'B'): 2,
     ('F#', 'A'): 2,
     ('F#', 'D'): 2,
     ('F#', 'Gm'): 3,
     ('F#', 'Dm'): 3,
     ('F#', 'C#m'): 3,
     ('F#', 'Fm'): 3,
     ('F#', 'Bm'): 3,
     ('F#', 'Cm'): 3,
     ('F#', 'G#m'): 3,
     ('F#', 'Am'): 3,
     ('F#', 'G'): 4,
     ('F#', 'F'): 4,
     ('F#', 'E'): 4,
     ('F#', 'G#'): 4,
     ('F#', 'C'): 4,
     ('F#', 'Em'): 5,
     ('A#m', 'A#m'): 0,
     ('A#m', 'A#'): 1,
     ('A#m', 'F#'): 1,
     ('A#m', 'C#'): 1,
     ('A#m', 'Gm'): 2,
     ('A#m', 'Dm'): 2,
     ('A#m', 'D#m'): 2,
     ('A#m', 'F#m'): 2,
     ('A#m', 'C#m'): 2,
     ('A#m', 'Fm'): 2,
     ('A#m', 'D#'): 3,
     ('A#m', 'G'): 3,
     ('A#m', 'F'): 3,
     ('A#m', 'G#'): 3,
     ('A#m', 'A'): 3,
     ('A#m', 'D'): 3,
     ('A#m', 'E'): 3,
     ('A#m', 'B'): 3,
     ('A#m', 'Am'): 4,
     ('A#m', 'Bm'): 4,
     ('A#m', 'Cm'): 4,
     ('A#m', 'G#m'): 4,
     ('A#m', 'Em'): 4,
     ('A#m', 'C'): 5,
     ('C#', 'C#'): 0,
     ('C#', 'A#m'): 1,
     ('C#', 'C#m'): 1,
     ('C#', 'Fm'): 1,
     ('C#', 'A#'): 2,
     ('C#', 'F#'): 2,
     ('C#', 'A'): 2,
     ('C#', 'E'): 2,
     ('C#', 'F'): 2,
     ('C#', 'G#'): 2,
     ('C#', 'Gm'): 3,
     ('C#', 'Dm'): 3,
     ('C#', 'Am'): 3,
     ('C#', 'G#m'): 3,
     ('C#', 'Cm'): 3,
     ('C#', 'Em'): 3,
     ('C#', 'D#m'): 3,
     ('C#', 'F#m'): 3,
     ('C#', 'D#'): 4,
     ('C#', 'G'): 4,
     ('C#', 'D'): 4,
     ('C#', 'B'): 4,
     ('C#', 'C'): 4,
     ('C#', 'Bm'): 5,
     ('Fm', 'Fm'): 0,
     ('Fm', 'F'): 1,
     ('Fm', 'G#'): 1,
     ('Fm', 'C#'): 1,
     ('Fm', 'Dm'): 2,
     ('Fm', 'Am'): 2,
     ('Fm', 'G#m'): 2,
     ('Fm', 'Cm'): 2,
     ('Fm', 'A#m'): 2,
     ('Fm', 'C#m'): 2,
     ('Fm', 'A#'): 3,
     ('Fm', 'F#'): 3,
     ('Fm', 'B'): 3,
     ('Fm', 'E'): 3,
     ('Fm', 'A'): 3,
     ('Fm', 'C'): 3,
     ('Fm', 'D'): 3,
     ('Fm', 'D#'): 3,
     ('Fm', 'Gm'): 4,
     ('Fm', 'Em'): 4,
     ('Fm', 'Bm'): 4,
     ('Fm', 'F#m'): 4,
     ('Fm', 'D#m'): 4,
     ('Fm', 'G'): 5,
     ('G#', 'G#'): 0,
     ('G#', 'G#m'): 1,
     ('G#', 'Fm'): 1,
     ('G#', 'Cm'): 1,
     ('G#', 'B'): 2,
     ('G#', 'E'): 2,
     ('G#', 'F'): 2,
     ('G#', 'C#'): 2,
     ('G#', 'D#'): 2,
     ('G#', 'C'): 2,
     ('G#', 'Dm'): 3,
     ('G#', 'Am'): 3,
     ('G#', 'A#m'): 3,
     ('G#', 'C#m'): 3,
     ('G#', 'Em'): 3,
     ('G#', 'D#m'): 3,
     ('G#', 'Gm'): 3,
     ('G#', 'Bm'): 3,
     ('G#', 'A#'): 4,
     ('G#', 'G'): 4,
     ('G#', 'F#'): 4,
     ('G#', 'A'): 4,
     ('G#', 'D'): 4,
     ('G#', 'F#m'): 5,
     ('Cm', 'Cm'): 0,
     ('Cm', 'D#'): 1,
     ('Cm', 'G#'): 1,
     ('Cm', 'C'): 1,
     ('Cm', 'D#m'): 2,
     ('Cm', 'Gm'): 2,
     ('Cm', 'G#m'): 2,
     ('Cm', 'Fm'): 2,
     ('Cm', 'Em'): 2,
     ('Cm', 'Am'): 2,
     ('Cm', 'A#'): 3,
     ('Cm', 'G'): 3,
     ('Cm', 'B'): 3,
     ('Cm', 'E'): 3,
     ('Cm', 'F#'): 3,
     ('Cm', 'F'): 3,
     ('Cm', 'A'): 3,
     ('Cm', 'C#'): 3,
     ('Cm', 'A#m'): 4,
     ('Cm', 'Dm'): 4,
     ('Cm', 'C#m'): 4,
     ('Cm', 'Bm'): 4,
     ('Cm', 'F#m'): 4,
     ('Cm', 'D'): 5,
     ('D#', 'D#'): 0,
     ('D#', 'D#m'): 1,
     ('D#', 'Gm'): 1,
     ('D#', 'Cm'): 1,
     ('D#', 'F#'): 2,
     ('D#', 'B'): 2,
     ('D#', 'A#'): 2,
     ('D#', 'G'): 2,
     ('D#', 'G#'): 2,
     ('D#', 'C'): 2,
     ('D#', 'A#m'): 3,
     ('D#', 'Dm'): 3,
     ('D#', 'Em'): 3,
     ('D#', 'Am'): 3,
     ('D#', 'G#m'): 3,
     ('D#', 'Fm'): 3,
     ('D#', 'Bm'): 3,
     ('D#', 'F#m'): 3,
     ('D#', 'F'): 4,
     ('D#', 'C#'): 4,
     ('D#', 'A'): 4,
     ('D#', 'D'): 4,
     ('D#', 'E'): 4,
     ('D#', 'C#m'): 5,
     ('Gm', 'Gm'): 0,
     ('Gm', 'A#'): 1,
     ('Gm', 'D#'): 1,
     ('Gm', 'G'): 1,
     ('Gm', 'A#m'): 2,
     ('Gm', 'Dm'): 2,
     ('Gm', 'D#m'): 2,
     ('Gm', 'Cm'): 2,
     ('Gm', 'Em'): 2,
     ('Gm', 'Bm'): 2,
     ('Gm', 'F#'): 3,
     ('Gm', 'C#'): 3,
     ('Gm', 'D'): 3,
     ('Gm', 'B'): 3,
     ('Gm', 'E'): 3,
     ('Gm', 'C'): 3,
     ('Gm', 'F'): 3,
     ('Gm', 'G#'): 3,
     ('Gm', 'Fm'): 4,
     ('Gm', 'Am'): 4,
     ('Gm', 'C#m'): 4,
     ('Gm', 'F#m'): 4,
     ('Gm', 'G#m'): 4,
     ('Gm', 'A'): 5,
     ('A#', 'A#'): 0,
     ('A#', 'Gm'): 1,
     ('A#', 'A#m'): 1,
     ('A#', 'Dm'): 1,
     ('A#', 'F#'): 2,
     ('A#', 'C#'): 2,
     ('A#', 'F'): 2,
     ('A#', 'D'): 2,
     ('A#', 'D#'): 2,
     ('A#', 'G'): 2,
     ('A#', 'Fm'): 3,
     ('A#', 'Am'): 3,
     ('A#', 'C#m'): 3,
     ('A#', 'Bm'): 3,
     ('A#', 'F#m'): 3,
     ('A#', 'D#m'): 3,
     ('A#', 'Cm'): 3,
     ('A#', 'Em'): 3,
     ('A#', 'A'): 4,
     ('A#', 'E'): 4,
     ('A#', 'B'): 4,
     ('A#', 'C'): 4,
     ('A#', 'G#'): 4,
     ('A#', 'G#m'): 5,
     ('Dm', 'Dm'): 0,
     ('Dm', 'A#'): 1,
     ('Dm', 'F'): 1,
     ('Dm', 'D'): 1,
     ('Dm', 'Gm'): 2,
     ('Dm', 'A#m'): 2,
     ('Dm', 'Fm'): 2,
     ('Dm', 'Am'): 2,
     ('Dm', 'Bm'): 2,
     ('Dm', 'F#m'): 2,
     ('Dm', 'D#'): 3,
     ('Dm', 'G'): 3,
     ('Dm', 'F#'): 3,
     ('Dm', 'A'): 3,
     ('Dm', 'C#'): 3,
     ('Dm', 'B'): 3,
     ('Dm', 'C'): 3,
     ('Dm', 'G#'): 3,
     ('Dm', 'C#m'): 4,
     ('Dm', 'Em'): 4,
     ('Dm', 'Cm'): 4,
     ('Dm', 'D#m'): 4,
     ('Dm', 'G#m'): 4,
     ('Dm', 'E'): 5,
     ('F', 'F'): 0,
     ('F', 'Fm'): 1,
     ('F', 'Dm'): 1,
     ('F', 'Am'): 1,
     ('F', 'A#'): 2,
     ('F', 'D'): 2,
     ('F', 'G#'): 2,
     ('F', 'C#'): 2,
     ('F', 'A'): 2,
     ('F', 'C'): 2,
     ('F', 'Gm'): 3,
     ('F', 'A#m'): 3,
     ('F', 'C#m'): 3,
     ('F', 'Em'): 3,
     ('F', 'Cm'): 3,
     ('F', 'Bm'): 3,
     ('F', 'F#m'): 3,
     ('F', 'G#m'): 3,
     ('F', 'D#'): 4,
     ('F', 'G'): 4,
     ('F', 'F#'): 4,
     ('F', 'E'): 4,
     ('F', 'B'): 4,
     ('F', 'D#m'): 5,
     ('Am', 'Am'): 0,
     ('Am', 'F'): 1,
     ('Am', 'A'): 1,
     ('Am', 'C'): 1,
     ('Am', 'Fm'): 2,
     ('Am', 'Dm'): 2,
     ('Am', 'C#m'): 2,
     ('Am', 'F#m'): 2,
     ('Am', 'Em'): 2,
     ('Am', 'Cm'): 2,
     ('Am', 'G#'): 3,
     ('Am', 'C#'): 3,
     ('Am', 'F#'): 3,
     ('Am', 'D'): 3,
     ('Am', 'E'): 3,
     ('Am', 'G'): 3,
     ('Am', 'A#'): 3,
     ('Am', 'D#'): 3,
     ('Am', 'Gm'): 4,
     ('Am', 'A#m'): 4,
     ('Am', 'Bm'): 4,
     ('Am', 'G#m'): 4,
     ('Am', 'D#m'): 4,
     ('Am', 'B'): 5}




```python
# Unused
def total_cost(chords):
    return sum(chord_distances[comb] for comb in combinations(chords, 2))

total_cost(['B', 'C'])
```




    4




```python
def partial_cost(current_cost, current_chords, new_chord):
    return sum(chord_distances[(current_chord, new_chord)] for current_chord in current_chords) + current_cost

partial_cost(4, {'B', 'C'}, 'A#m')
```




    12




```python
key_dict = {(3, 4): 0, (3, 5): 1, (5, 4): 2,
            (4, 3): 0, (4, 5): 1, (5, 3): 2}

def get_position(chord):
    f = [i for i, e in enumerate(list(chord_table.loc[chord])) if e]
    return key_dict[f[1]-f[0], f[2]-f[1]]

get_position('F')
```




    2




```python
def partial_cost_pos(current_cost, current_chords, new_chord):
    return partial_cost(current_cost, current_chords, new_chord) + (2 - get_position(new_chord))

partial_cost_pos(7, {'C', 'B'}, 'A#m')
```




    16




```python
def partial_cost_pos_noC(current_cost, current_chords, new_chord):
    if new_chord == 'C':
        return None
    return partial_cost(current_cost, current_chords, new_chord) + (2 - get_position(new_chord))

partial_cost_pos(7, {'C', 'B'}, 'A#m')
```




    16



## X*


```python
class X_Star_Generalized:
    
    
    def __init__(self, table, cost_function=lambda *args: 0, optional_cols=None, ignore_cols=None):
        
        __slots__ = ['table', 'queue', 'cost_function', 'optional_cols']
        
        self.table = table if ignore_cols is None else table.loc[:, [col not in ignore_cols for col in table.columns]]
        self.queue = PriorityQueue()
        self.cost_function = cost_function
        self.optional_cols = [] if optional_cols is None else optional_cols
            
        starting_column = self.get_next_column(table)
        starting_rows = self.get_next_rows(table, starting_column)

        for row in starting_rows:
            self.enqueue(0, [], row)
    
    
    def enqueue(self, current_cost, current_path, next_row):
        
        new_path = current_path + [next_row]
        new_cost = self.cost_function(current_cost, current_path, next_row)
        
        if new_cost is not None:
            self.queue.put((new_cost, new_path))
        
        
    def primary(self, frame):
        
        primary_frame = frame.loc[:, [col not in self.optional_cols for col in frame.columns]]
        return primary_frame
    
    
    def get_next_column(self, frame):
        
        primary_frame = self.primary(frame)
        col_sums = primary_frame.sum()
        if 0 in col_sums.shape:
            return None
        least_col_index = col_sums.idxmin()
        min_col_sum = col_sums[least_col_index]
        
        return least_col_index if min_col_sum else None

    
    def get_next_rows(self, frame, column):
        
        rows = frame.loc[:, column]
        next_rows = rows[rows].index
        return next_rows
    
    
    def fold(self, rows):
        
        frame = self.table.loc
        row = frame[rows, :].any(axis=0)
        new_rows = ~(frame[:, row].any(axis=1))
        new_cols = ~row
        new_frame = frame[new_rows, new_cols]

        return new_frame
    
    
    def __iter__(self):
        
        while not self.queue.empty():
            current_cost, current_path = self.queue.get()
            new_table = self.fold(current_path)
            rownum, colnum = new_table.shape
            primary_rownum, primary_colnum = self.primary(new_table).shape
            
            if primary_colnum == 0:
                yield current_path, current_cost
                continue
                
            next_column = self.get_next_column(new_table)
            
            if next_column is None:
                continue
                
            next_rows = self.get_next_rows(new_table, next_column)
            
            for next_row in next_rows:
                self.enqueue(current_cost, current_path, next_row)
        
        return

```


```python
chord_solver_pos = X_Star_Generalized(chord_table, partial_cost_pos_noC)
for solution in chord_solver_pos:
    print(solution)
```

    (['F', 'C#m', 'Gm', 'B'], 23)
    (['Fm', 'A', 'Bm', 'D#'], 24)
    (['Fm', 'A', 'Gm', 'B'], 24)
    (['Am', 'C#', 'G', 'D#m'], 25)
    (['Cm', 'E', 'F#m', 'A#'], 25)
    (['Fm', 'A', 'G', 'D#m'], 25)
    (['Am', 'C#', 'Gm', 'B'], 26)
    (['F', 'C#m', 'G', 'D#m'], 26)
    (['G#', 'Em', 'A#m', 'D'], 26)
    (['G#', 'Em', 'F#m', 'A#'], 26)
    (['F', 'C#m', 'Bm', 'D#'], 27)
    (['G#', 'Em', 'F#', 'Dm'], 27)
    (['Am', 'C#', 'Bm', 'D#'], 28)
    (['Cm', 'E', 'F#', 'Dm'], 28)
    (['Cm', 'E', 'A#m', 'D'], 29)
    
