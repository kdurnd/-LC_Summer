class HashTable {  
    constructor(hash, size = 10) {  
        this.size = size;  
        this.hash = hash 
        this.buckets = new Array(size).fill(null).map(() => []);
    }  

    insert(key, value) {  
        const index = this.hash(key);  
        const bucket = this.buckets[index];  
        for (let i = 0; i < bucket.length; i++) {  
            if (bucket[i].key === key) {  
                bucket[i].value = value;
                return;  
            }  
        }  
        bucket.push({ key, value });  
    }  
    
    get(key) {  
        const index = this.hash(key);  
        const bucket = this.buckets[index];  
  
        for (let i = 0; i < bucket.length; i++) {  
            if (bucket[i].key === key) {  
                return bucket[i].value;  
            }  
        }  
        return undefined; 
    }  
   
    delete(key) {  
        const index = this.hash(key);  
        const bucket = this.buckets[index];  
  
        for (let i = 0; i < bucket.length; i++) {  
            if (bucket[i].key === key) {  
                bucket.splice(i, 1); 
                return true;  
            }  
        }  
  
        return false; 
    }  
}  
  
 