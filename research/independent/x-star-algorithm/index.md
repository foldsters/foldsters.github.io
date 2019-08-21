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

Chord     | C | C# | D | D# | E | F | F# | G | G# | A | A# | B
---|---|---|---|---|---|---|---|---|---|---|---|---
C Major | 1 | 0 | 0 | 0 | 1 | 0 | 0 | 1 | 0  | 0 | 0 | 0
F Minor | 1 | 0 | 0 | 0 | 0 | 1 | 0 | 0 | 1  | 0 | 0 | 0

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
     
        . . .
        
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
chord_solver = X_Star(chord_table, partial_cost)
for solution in chord_solver:
    print(solution)
```

    (['Am', 'C#', 'G', 'D#m'], 20)
    (['C', 'G#m', 'F#', 'Dm'], 20)
    (['Cm', 'E', 'F#m', 'A#'], 20)
    (['F', 'C#m', 'Gm', 'B'], 20)
    (['Fm', 'A', 'Bm', 'D#'], 20)
    (['G#', 'Em', 'A#m', 'D'], 20)
    (['Am', 'C#', 'Bm', 'D#'], 22)
    (['Am', 'C#', 'Gm', 'B'], 22)
    (['C', 'G#m', 'A#m', 'D'], 22)
    (['C', 'G#m', 'F#m', 'A#'], 22)
    (['Cm', 'E', 'A#m', 'D'], 22)
    (['Cm', 'E', 'F#', 'Dm'], 22)
    (['F', 'C#m', 'Bm', 'D#'], 22)
    (['F', 'C#m', 'G', 'D#m'], 22)
    (['Fm', 'A', 'G', 'D#m'], 22)
    (['Fm', 'A', 'Gm', 'B'], 22)
    (['G#', 'Em', 'F#', 'Dm'], 22)
    (['G#', 'Em', 'F#m', 'A#'], 22)
   

```python
chord_solver_pos = X_Star(chord_table, partial_cost_pos)
for solution in chord_solver_pos:
    print(solution)
```

    (['F', 'C#m', 'Gm', 'B'], 23)
    (['C', 'G#m', 'F#', 'Dm'], 24)
    (['Fm', 'A', 'Bm', 'D#'], 24)
    (['Fm', 'A', 'Gm', 'B'], 24)
    (['Am', 'C#', 'G', 'D#m'], 25)
    (['C', 'G#m', 'F#m', 'A#'], 25)
    (['Cm', 'E', 'F#m', 'A#'], 25)
    (['Fm', 'A', 'G', 'D#m'], 25)
    (['Am', 'C#', 'Gm', 'B'], 26)
    (['F', 'C#m', 'G', 'D#m'], 26)
    (['G#', 'Em', 'A#m', 'D'], 26)
    (['G#', 'Em', 'F#m', 'A#'], 26)
    (['C', 'G#m', 'A#m', 'D'], 27)
    (['F', 'C#m', 'Bm', 'D#'], 27)
    (['G#', 'Em', 'F#', 'Dm'], 27)
    (['Am', 'C#', 'Bm', 'D#'], 28)
    (['Cm', 'E', 'F#', 'Dm'], 28)
    (['Cm', 'E', 'A#m', 'D'], 29)
    
