var maze = [
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 1, 0, 1, 0, 1, 0, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 0, 1 ],
  [ 1, 0, 0, 0, 0, 0, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 0, 1 ],
  [ 1, 0, 1, 0, 1, 0, 0, 1 ],
  [ 1, 1, 1, 1, 1, 1, 1, 1 ],
];

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
        && newPos.x >= 0 && newPos.x < 8
        && newPos.y >= 0 && newPos.y < 8){
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
function findPath(maze, nodes) {
  let pos = {x:1, y:1};
  let queue = [pos];
  nodes[pos.y][pos.x].visited = true;
  while(queue.length > 0){
    pos = queue.shift();
    if (pos.x == 6 && pos.y == 6) {
      return pos;
    }
    getAdjacentEmptyCells(pos, maze).forEach((newPos) => {
      if (!nodes[newPos.y][newPos.x].visited){
        nodes[newPos.y][newPos.x].visited = true;
        newPos.parent = pos;
        queue.push(newPos);
      }
    });
  }
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
for(i=0;i<8;i++){
  nodes[i] = [];
  for(j=0;j<8;j++){
    nodes[i][j] = { visited: false };
  }
}
final = findPath(maze, nodes);
console.log(final);
console.log(backtrace(final));
