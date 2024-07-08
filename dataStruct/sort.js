let arr = [3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48] 
const swap = (arr, i, j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}
//插入排序
function insertSort(arr) {
    let len = arr.length;
    for (let i = 0; i < len; i++) {
        let temp = arr[i];
        let j = i;
        while (j > 0 && arr[j - 1] > temp) {
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = temp;
    }
}
// insertSort(arr)
// console.log(arr)    

//堆排序
const makeMaxHeap = (arr) =>{
    let len = arr.length;
    for (let i = Math.floor(len / 2); i >= 0; i--) {
        _heapify(arr, i, len);
    }
}
const heapify = (arr, i, len) => {
    let left = 2 * i + 1;
    let right = 2 * i + 2;
    if (left < len && arr[left] > arr[i]) {
        swap(arr, i, left);
        _heapify(arr, left, len);
    }
    if (right < len && arr[right] > arr[i]) {
        swap(arr, i, right);
        _heapify(arr, right, len);
    }
}   

function heapSort(arr) {    
    
    let len = arr.length;
    makeMaxHeap(arr);
    for (let i = len - 1; i > 0; i--) {
        swap(arr, 0, i);
        len--;
        heapify(arr, 0, len)
    }
}
// heapSort(arr)
// console.log(arr)

//快速排序
const partition = (arr,left,right) => {
    let pivot = arr[right];   
    let i = left - 1;         
    for (let j = left; j < right; j++) {  
        if (arr[j] <= pivot) {   
            i++;  
            _swap(arr, i, j);  
        }  
    }  
    _swap(arr, i + 1, right);    
    return i + 1;    
}
function quickSort(arr, left, right) {
    
    
    if(left >= right) return;
    let index = partition(arr, left, right)
    quickSort(arr, left, index - 1)
    quickSort(arr, index + 1, right) 
}
// quickSort(arr,0,arr.length-1)
// console.log(arr)

//归并排序
const merge = (left, right) => {
    let result = [];
    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }
    while (left.length) result.push(left.shift());
    while (right.length) result.push(right.shift());
    return result;
}
function mergeSort(arr) {
    if (arr.length < 2) return arr;
    let middle = Math.floor(arr.length / 2);
    let left = arr.slice(0, middle);
    let right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right))
}
// arr = mergeSort(arr)
// console.log(arr)