class dsu{
    constructor(n){
        this.parent = new Array(n);
        this.rank = new Array(n);
        for(let i=0;i<n;i++){
            this.parent[i] = i;
            this.rank[i] = 0;
        }
    }
    find(x){
        if(this.parent[x] != x){
            this.parent[x] = this.find(this.parent[x]);
        }
        return this.parent[x];
    }
    union(x, y){
        let px = this.find(x);
        let py = this.find(y);
        if(px == py) return false;
        if(this.rank[px] > this.rank[py]){
            this.parent[py] = px;
        }
        else if(this.rank[px] < this.rank[py]){
            this.parent[px] = py;
        }
        else{
            this.parent[px] = py;
            this.rank[py]++;
        }
        return true;
    }
}

let test = new dsu(5);
console.log(test.find(0));
console.log(test.union(0, 1));
console.log(test.find(0));
console.log(test.find(1));
console.log(test.union(1, 2));
console.log(test.find(2));
console.log(test.union(3, 4));
console.log(test.find(4));
console.log(test.union(2, 4));
console.log(test.find(4));
console.log(test.find(3));