var maze = [
  [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1, ],
  [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1, ],
  [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1, ],
  [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1, ],
  [ 1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1, ],
  [ 1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1, ],
  [ 1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1, ],
  [ 1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,1, ],
  [ 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1, ],
];

// Already included in API
function getAdjacentEmptyCells(pos, maze){
  const directions = {
    up:    { x: 0, y: -1},
    right: { x: 1, y: 0},
    down:  { x: 0, y: 1},
    left:  { x: -1, y: 0},
  };
  let result = [];
  for (const direction in directions) {
    const delta = directions[direction];
    const newPos = {x: (pos.x + delta.x), y: (pos.y + delta.y)};
    if (maze[newPos.y][newPos.x] == 0
        && newPos.x >= 0 && newPos.x < 50
        && newPos.y >= 0 && newPos.y < 50){
      result.push({...newPos, dir: direction});
    }
  }
  return result;
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

function debugMaze(maze){
  for(i=0;i < maze.length; i++){
    str = "";
    for(j=0;j < maze[i].length; j++){
      str += (maze[i][j] == 0 ? " " : maze[i][j]);
    }
    console.log(str + " / " + maze[i].length);
  }
}

function debugPath(route, maze, trail){
  for(z = 0 ; z < route.length ; z++) {
    cursor = route[z];
    maze[cursor.y][cursor.x] = "@";
    if (z > 0 && !trail) {
      previous = route[z-1];
      maze[previous.y][previous.x] = 0;
    }
    console.log(cursor.dir);
    debugMaze(maze);
  }
}

function inspect(pos){
  return "<"+pos.x+","+pos.y+">";
}

let nodes = [];
for(i=0;i<8;i++){
  nodes[i] = [];
  for(j=0;j<50;j++){
    nodes[i][j] = { visited: false };
  }
}

let pos = {x:1, y:1};
let queue = [pos];
nodes[pos.y][pos.x].visited = true;
while(queue.length > 0){
  pos = queue.shift();
  if (pos.x == 48 && pos.y == 7) {
    break;
  }
  getAdjacentEmptyCells(pos, maze).forEach((newPos) => {
    if (!nodes[newPos.y][newPos.x].visited){
      nodes[newPos.y][newPos.x].visited = true;
      newPos.parent = pos;
      queue.push(newPos);
    }
  });
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

route = backtrace(pos);
// debugPath(route, maze, true);
// console.log(route);
for(i=0;i<2;i++){
  curr = route[i];
  next = route[i+1];
  console.log(inspect(curr) + "->" + inspect(next) + getMove(curr, next));
}
