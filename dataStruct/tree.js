class tree{
    constructor(data){
        this.data = data
        this.left = null
        this.right = null
    }
    //先序遍历
    preOrder(){
        console.log(this.data)
        if(this.left){
            this.left.preOrder()
        }
        if(this.right){
            this.right.preOrder()
        }
    }
    preOrderByCycle(){
        let stack = []
        let node = this
        while(node || stack.length){
            while(node){
                console.log(node.data)
                stack.push(node)
                node = node.left
            }
            node = stack.pop()
            node = node.right   
        }
    }
    //中序遍历
    inOrder(){
        if(this.left){
            this.left.inOrder()
        }
        console.log(this.data)
        if(this.right){
            this.right.inOrder()
        }
    }
    inOrderByCycle(){
        let stack = []
        let node = this
        while(node || stack.length){
            while(node){
                stack.push(node)
                node = node.left
            }
            node = stack.pop()
            console.log(node.data)
            node = node.right   
        }
    }
    //后序遍历
    postOrder(){
        if(this.left){
            this.left.postOrder()
        }
        if(this.right){
            this.right.postOrder()
        }
        console.log(this.data)
    }
    postOrderByCycle(){
        let stack = []
        let node = this
        let last = null
        while(node || stack.length){
            while(node){
                stack.push(node)
                node = node.left
            }
            node = stack[stack.length - 1]
            if(!node.right || node.right == last){
                console.log(node.data)
                last = node
                stack.pop()
                node = null
            }else{
                node = node.right
            }
        }
    }
    //层序遍历
    levelOrder(){
        let queue = []
        queue.push(this)
        while(queue.length){
            let node = queue.shift()
            console.log(node.data)
            if(node.left){
                queue.push(node.left)
            }
            if(node.right){
                queue.push(node.right)
            }
        }
    }
}

let node1 = new tree(1)
let node2 = new tree(2)
let node3 = new tree(3)
let node4 = new tree(4)
let node5 = new tree(5)
node1.left = node2
node1.right = node3
node2.left = node4
node3.right = node5
node1.levelOrder()

