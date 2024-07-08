class node {
    constructor(val) {
        this.val = val
        this.edges = []
        this.inDegree = 0
        this.outDegree = 0
    }
    addEdge(node) {
        this.edges.push(node)
        this.outDegree++
        node.inDegree++
    }
}

class graph {
    constructor() {
        this.nodes = {}
    }
    addNode(val) {
        this.nodes[val] = new node(val)
    }
    addEdge(val1, val2) {
        if (this.nodes[val1] && this.nodes[val2]) {
            this.nodes[val1].addEdge(this.nodes[val2])
        }
    }
    bfs(val) {
        let queue = [this.nodes[val]]
        let visited = {}
        while (queue.length) {
            let current = queue.shift()
            if (!visited[current.val]) {
                visited[current.val] = true
                console.log(current.val)
                current.edges.forEach(edge => {
                    queue.push(edge)
                })
            }
        }
    }
    dfs(val, visited = {}) {
        if (!visited[val]) {
            visited[val] = true
            console.log(val)
            this.nodes[val].edges.forEach(edge => {
                this.dfs(edge.val, visited)
            })
        }
    }
    topoSort() {
        let nodes = Object.values(this.nodes)
        let queue = []
        let visited = {}
        let result = []
        nodes.forEach(node => {
            if (node.inDegree === 0) {
                queue.push(node)
            }
        })
        while (queue.length) {
            let current = queue.shift()
            if (!visited[current]) {
                visited[current] = true
                result.push(current.val)
                current.edges.forEach(edge => {
                    edge.inDegree--
                    if (edge.inDegree === 0) {
                        queue.push(edge)
                    }
                })
            }
        }
        return result
    }
}
let g = new graph()
g.addNode(1)
g.addNode(2)
g.addNode(3)
g.addNode(4)
g.addNode(5)
g.addEdge(1, 2)
g.addEdge(1, 3)
g.addEdge(2, 4)
g.addEdge(3, 4)
g.addEdge(4, 5)
// g.bfs(1)
// g.dfs(1)
// console.log(g.topoSort())



