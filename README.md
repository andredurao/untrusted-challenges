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
