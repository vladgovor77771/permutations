const _ = require("lodash");
const getPermutations = require("./get_permutations");
const input = require("./permutation");

class Permutation {
  constructor(nodes) {
    if (!Array.isArray(nodes)) nodes = [];
    this.length = nodes.length;
    this.nodes = nodes;
  }

  addNode(node) {
    this.nodes.push(node);
    this.length++;
  }

  findCommutations() {
    let permutations = [];
    getPermutations(this.length).forEach(p => {
      let permutation = new Permutation();
      for (let i = 1; i < this.length + 1; i++) permutation.addNode(new Node(i, p[i - 1]));
      permutations.push(permutation);
    });

    let res = permutations.filter(p => this.isCommutation(p));
    return res;
  }

  isCommutation(permutation) {
    if (this.multiply(permutation).isEqualTo(permutation.multiply(this))) return true;
    else return false;
  }

  multiply(permutation) {
    if (permutation.length < this.length) throw new Error("Length must be equal!");
    let res = new Permutation();
    for (let node of this.nodes) {
      let otherNode = permutation.nodes.find(n => n.from == node.to);
      res.addNode(new Node(node.from, otherNode.to));
    }
    return res;
  }

  inverse() {
    let res = new Permutation();
    for (let node of this.nodes) res.addNode(new Node(node.to, node.from));
    return res;
  }

  print() {
    this.sortNodes();
    console.log("|" + this.nodes.map(n => n.from).join(" ") + "|");
    console.log("|" + this.nodes.map(n => n.to).join(" ") + "|");
  }

  printAsCycle() {
    let res = "";
    let checked = [];
    for (let node of this.nodes) {
      if (checked.find(from => from == node.from)) continue;
      res += "(";
      checked.push(node.from);
      res += node.from;
      let goTo = node.to;
      while (goTo != node.from) {
        let nextNode = this.nodes.find(n => n.from == goTo);
        checked.push(nextNode.from);
        res += nextNode.from;
        goTo = nextNode.to;
      }
      res += ")";
    }

    console.log(res);
  }

  isEqualTo(permutation) {
    let res = true;
    for (let node of this.nodes) {
      let otherNode = permutation.nodes.find(n => n.from == node.from);
      if (otherNode.to != node.to) {
        res = false;
        break;
      }
    }
    return res;
  }

  sortNodes() {
    this.nodes = _.sortBy(this.nodes, "from");
  }
}

class Node {
  constructor(from, to) {
    this.from = from;
    this.to = to;
  }
}

const p2 = new Permutation();
for (let i = 1; i < input.length + 1; i++) p2.addNode(new Node(i, input[i - 1]));

p2.printAsCycle();
console.log();

p2.findCommutations().map(p => p.printAsCycle());
