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
