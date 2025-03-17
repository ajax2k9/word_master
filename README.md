# Transform Engine
## What it is:
A unity like transform engine that handles rotations, scales and translations of parent child object hiarchies.

## What is it for?
p5js has many ways to make body centered connections via "push" and "pop", however it doesnt edit the actual positons, as its part of the rendering pipline. this causes issues with rendering objects and changing the scale, as it shrinks/grows features like line thickness and makes them blurry. 

this solves the issue by performing the calculations outside of the render pipeline, and being able to return an objects global position.

## features:
- Can connect child nodes to parent nodes
- Parent nodes affect the child nodes through rotation, translation scaling 
- Node trees retain relative positions to each other
- can get the "global" x and y position from any node
- can disconnect child nodes from parent nodes and have it be its own tree

## How to use it
- create new transform object with 
```
new Transform(x,y,parent) // parent must also be a transform object
```
or
```
new Transform(x,y) //use this to create a root node
```

-position an object relative to parent
```
t.Position(x,y) //set pos
t.Position() // get pos
```

-rotate an object relative to parent, in degrees
```
t.Rotate(ang) //sets angle
t.Rotate() //gets angle
```

-scale an object relative to parent
```
t.Scale(s) //sets scale
t.Scale() //gets scale
```

-get global(world) position 
```
t.Scale(s) //sets scale
t.Scale() //gets scale
```




