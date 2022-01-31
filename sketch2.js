let submit = document.getElementById("submit");
submit.addEventListener("click", function (e) {
  let name1 = document.getElementById("name1");
  let name2 = document.getElementById("name2");
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }

  let myObj = {
    title: "Friend of",
    cast: [name1.value, name2.value],
  };

  notesobj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  name1.value = "";
  name2.value = "";
});

var data;
var graph;
var dropdown;
var dropdown2;

function preload() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  } else {
    notesobj = JSON.parse(notes);
  }
  // data = loadJSON('list.json');
  // data = JSON.parse(localStorage.getItem('notes'))
  data = notesobj;
  // console.log(data)
}

function setup() {
  graph = new Graph();
  dropdown = createSelect();
  dropdown2 = createSelect();
  dropdown.changed(bfs);
  dropdown2.changed(bfs);
  noCanvas();

  var friends = data;
  console.log(friends);

  for (var i = 0; i < friends.length; i++) {
    var friend = friends[i].title;
    // var friend = friends.title;
    console.log(friend);
    var cast = friends[i].cast;
    // console.log(cast)
    var friendNode = new Node(friend);
    graph.addNode(friendNode);

    for (var j = 0; j < cast.length; j++) {
      var actor = cast[j];
      var actorNode = graph.getNode(actor);
      if (actorNode == undefined) {
        actorNode = new Node(actor);
        dropdown.option(actor);
        dropdown2.option(actor);
      }
      graph.addNode(actorNode);
      friendNode.addEdge(actorNode);
    }
  }
}

function bfs() {
  graph.reset();
  var start = graph.setStart(dropdown.value());

  var end = graph.setEnd(dropdown2.value());

  var queue = [];

  start.searched = true;
  queue.push(start);

  while (queue.length > 0) {
    var current = queue.shift();

    if (current == end) {
      console.log("Found " + current.value);
      break;
    } else if (current != end) {
      console, log("no relation");
    }

    var edges = current.edges;
    for (var i = 0; i < edges.length; i++) {
      var neighbor = edges[i];
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }

  var path = [];
  path.push(end);
  var next = end.parent;
  while (next != null) {
    path.push(next);
    next = next.parent;
  }

  var txt = "";
  for (var i = path.length - 1; i >= 0; i--) {
    var n = path[i];
    txt += n.value;
    console.log(n);
    console.log(i);
    if (i != 0) {
      txt += " --> ";
    } else if (end == end.value) {
      txt += "no";
    }
  }
  createP(txt);
}
