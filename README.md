# My untrusted challenges solutions:

Untrusted:
* https://github.com/AlexNisnevich/untrusted

## Chapter 1

1. cellBlockA

- Simply erase all code sections (black background)

2. theLongWayOut

- Embrace the code using the two sections with:

```js
if (false) {
// ...
}
```

3. validationEngaged

- Draw the same quantity of blocks, but on the beginning of the canvas.

```js
numBlocks = 2 * (map.getHeight()-13) + 2 * (map.getWidth()-10);

for (i = 0 ; i < numBlocks ; i++) {
  x = i % map.getWidth();
  y = i / map.getWidth();
  map.placeObject(x, y, 'block');
}
```

4. multiplicity

- Draw another exit, right new to the player

```js
player = map.getPlayer();
map.placeObject(player.getX() - 1, player.getY(), 'exit');
```

5. minesweeper

- Set the background color of the square where the mine is located

```js
map.setSquareColor(x, y, 'green');
```

6. drones101

- Setup a trap for the drone, so the player can reach the exit

```js
for ( i=0 ; i < 5 ; i++) {
  map.placeObject(map.getWidth()-15, 10+i, 'block');
  map.placeObject(map.getWidth()-15+i, 10, 'block');
  map.placeObject(map.getWidth()-15+i, 15, 'block');
}
map.placeObject(map.getWidth()-10, 11, 'block');
map.placeObject(map.getWidth()-10, 13, 'block');
map.placeObject(map.getWidth()-10, 14, 'block');
```

7. colors

- Alternate between the colors of the player whenever you call the phone

```js
var player = map.getPlayer();
var colors = ['#0f0', '#f00', '#ff0'];
var index = 0;
for(i = 0 ; i < colors.length ; i++) {
  if (player.getColor() == colors[i]){
    index = i;
  }
}
var nextColor = colors[++index % colors.length]
player.setColor(nextColor);
```

## Chapter 2

8. intoTheWoods

- Render the fortress again on each phone call and move the player along the possible
  combinations. In this challenge we can only change the string of function.

```js
// "generateForest"
map.getPlayer().setPhoneCallback(functionList["generateForest"]);
```

9. fordingTheRiver

- Define a phone call function to change the raft move direction.

```js
map.getPlayer().setPhoneCallback(function () {
  raftDirection = 'up';
});
```

10. ambush

- Move the drone randomly to up or down + left or right in a way that on each player
  step, the drone would move away from the central row

- red:
```js
var direction = ['up', 'left'][Math.floor(Math.random() * 2)];
me.move(direction);
```

- yellow:
```js
var direction = ['down', 'left'][Math.floor(Math.random() * 2)];
me.move(direction);
```

- green:
```js
var direction = ['up', 'left'][Math.floor(Math.random() * 2)];
me.move(direction);
```

11. robot

- There's no walls for the robot, so just allow it to move down or right

```js
if (me.canMove('down')){
  move('down');
}
if (me.canMove('right')){
  move('right');
}
```

12. robotNav

- Unfortunately, I didn't find a best solution using canMove and move in this case.
  So I used positional conditions to move the robot:

```js
if (me.getX() == 1 && me.getY() < 5) {
  me.move('down');
}

if (me.getY() == 5 && me.getX() < 30) {
  me.move('right');
}

if (me.getY() == 5 && me.getX() == 30) {
  me.move('up');
}

if (me.getY() == 4 && me.getX() < 48) {
  me.move('right');
}

if (me.getX() == 48) {
  me.move('down');
}
```

13. robotMaze

- Well... I didn't find a simpler way (yet) to solve this challenge, so I'm using a
  Breadth-first finding algorithm to solve the puzzle.

```js
function getPos(me){
  return {x: me.getX(), y: me.getY()};
}
function getAdjPos(cell){
  return {x: cell[0][0], y: cell[0][1], dir: cell[1]};
}
function includePos(queue, pos){
  let result = false;
  for(item in queue){
    if (item.x == pos.x && item.y == pos.y) {
      result = true;
    }
  }
  return result;
}

function backtrace(node) {
  var path = [node];
  while (node.parent) {
      node = node.parent;
      path.push(node);
  }
  return path.reverse();
}

let nodes = [];
for(i=0;i<10;i++){
  nodes[i] = [];
  for(j=0;j<map.getWidth();j++){
    nodes[i][j] = { visited: false };
  }
}
function inspect(pos){
  return "" + pos.x + "," + pos.y + " " + pos.dir;
}
function getMove(from, to){
  const directions = {
    "0-1": "up",
    "10": "right",
    "01": "down",
    "-10": "left",
  };
  move = "" + (to.x - from.x) + (to.y - from.y);
  return directions[move];
}
//key = 47,8
function finalMove(pos){
  destination = {x: 48, y: 8};
  distance = {x: (destination.x - pos.x), y: (destination.y - pos.y)}
  if (distance.x == 1) {
    return "right";
  }
  if (distance.y == 1) {
    return "down";
  }
}

let pos = {x: 1, y: 1};
let queue = [pos];
nodes[pos.y][pos.x].visited = true;
while(queue.length > 0){
  pos = queue.shift();
  // destination (key)
  if (pos.x == 47 && pos.y == 8) {
    break;
  }
  adjacentCells = map.getAdjacentEmptyCells(pos.x, pos.y);
  for(cell_idx = 0 ; cell_idx < adjacentCells.length; cell_idx++){
  cell = adjacentCells[cell_idx];
    newPos = getAdjPos(cell);
    pos.dir = newPos.dir;
    if (!nodes[newPos.y][newPos.x].visited){
      nodes[newPos.y][newPos.x].visited = true;
      newPos.parent = pos;
      queue.push(newPos);
    }
  }
}


cur = getPos(me);
if (cur.x == 48 && (cur.y >= 8 && cur.y < 10)) {
  map.writeStatus(inspect(getPos(me)));
  me.move("down");
} else if(cur.x >= 47 && cur.y >= 7) {
  map.writeStatus(inspect(getPos(me)));
  move = finalMove(cur);
  me.move(move)
} else {
  let route = backtrace(pos);
  currentIndex = 0;
  for(i = 0 ; i < route.length ; i++){
    if(me.getX() == route[i].x && me.getY() == route[i].y){
      currentIndex = i;
      break;
    }
  }

  move = getMove(route[i], route[i+1]);
  map.writeStatus(inspect(getPos(me)));
  me.move(move);
}
```

14. crispsContest

- There's just a string of where you can change in this challenge.
- On the three previous challenges you've got the red, green and blue keys. This challenge you've have to find a way to get the [A]lgorithm using the keys.
There are a few locks on the way and they are represented with the "⊗" symbol
these locks can only be opened with their respective color keys.
- To reach the goal you must have at least one yellow and one blue key.

This is the path I've did:
- Top-left path: Ends with a red, green and yellow keys
- Top-right path: Ends with a gree, yellow and blue keys
- Bottom path: Get the [A]lgorithm and yellow keys
- Finish


```js
    //     +++++ +++++
    //     + 2 +++ 3 +
    //     +   +7+   +
    //   +++ + + + + +++
    //   + 1         4 +
    //   +   +     +   +
    //   +++++  @  +++++
    //   +   +     +   +
    //   +             +
    //   ++++++ + ++++++
    //       +  +  +
    //       + 5 6 +
    //       +++++++
    map.defineObject('greenLock', {
        'symbol': String.fromCharCode(0x2297),
        'color': '#0f0',
        'impassable': function (player) {
            if (player.hasItem('blueKey')) {
                player.removeItem('phone');
                return false;
            } else {
                return true;
            }
        }
    });
```

15. exceptionalCrossing

- I've lost the Algorithm, but that's ok otherwise the game should've ended.
  But now the only thing let to change is the killedBy message. My guess is that
  I'd have to add a raft behaviour inside that block, but it's only a guess.
- Also I still have a phone

- This is the raft definition from challenge 9:

```js
map.defineObject('raft', {
    'type': 'dynamic',
    'symbol': '▓',
    'color': '#420',
    'transport': true, // (prevents player from drowning in water)
    'behavior': function (me) {
        me.move(raftDirection);
    }
});
```

- But when I've tried to use it as a one-line, the editable space only
  accepts 50 characters and I've got this error:

```
SyntaxError: Invalid or unexpected token
```

- Since the definition is executed before the loop I've tried to define a object at 1,1
  and with that, I was able to "walk" above the water. While I was crossing I received
  the following error message: `There is no type of object named nothing`.
```js
player.killedBy(""+map.placeObject(1, 1, 'nothing'));
```

- In the end I think any function that throw an exception would work here, I've tried to
  run `throw 'ex'` but it returns a SyntaxError, I've used the function above and moved
  to the next level:
```
SyntaxError: Unexpected token 'throw'
```

16. lasers

- We now have two editable areas: in createLaser function and startLevel functions
- first: draw the lasers with their respective colors

```js
// using canvas to draw the line
var ctx = map.getCanvasContext();
ctx.beginPath();
ctx.strokeStyle = color;
ctx.lineWidth = 5;
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.stroke();
```

- second: implement a phone callback to change the player color

```js
player = map.getPlayer();
player.setPhoneCallback(
  function(){
    colors = ['red', 'yellow', 'teal'];
    index = Math.floor(Math.random() * 3);
    player.setColor(colors[index]);
  }
);
```

17. pointers

- This problem can be solved by changing the colors of the portals to a different
  when they point to a trap and vice-versa.

```js
// TODO find a way to remove the API docs
// wouldn't want the 'good doctor' to find
// out about map.getCanvasCoords()...
if (t2.getType() == 'trap'){
  map.writeStatus("" + t1.getX() + "," + t1.getY());
  map.setSquareColor(t1.getX(), t1.getY(), 'green');
}
if (t1.getType() == 'trap'){
  map.writeStatus("" + t2.getX() + "," + t2.getY());
  map.setSquareColor(t2.getX(), t2.getY(), 'green');
}
```
