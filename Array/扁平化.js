// 编写一个程序将数组扁平化，并去除其中重复部分的数据，最终得到一个升序且并不重复的数组
// array.join(',') 可以把多维的数组变为字符串
// array.flat(Infinity) 可以把多维的数组变为一维数组，只有 ES6 才可以时候用
// 头条一面

function handler(array) {
    let newArray = array.join(',').split(',');
    let set = unique(newArray);
    quickSort(set, 0, set.length-1);
    return set;
}

function unique(array) {
    let obj = {};
    for (let value of array) {
        if (obj.hasOwnProperty(value)) {
            obj[value]++;
        } else {
            obj[value] = 1;
        }
    }
    return Object.keys(obj).map(item => parseInt(item));
}

function quickSort(array, left, right) {
    if (left >= right) {
        return;
    }

    let currVal = array[left];
    let leftIndex = left, rightIndex = right;

    while (leftIndex < rightIndex) {
        while (leftIndex < rightIndex) {
            if (array[rightIndex] < currVal) {
                array[leftIndex] = array[rightIndex];
                break;
            }
            rightIndex--;
        }
        while (leftIndex < rightIndex) {
            if (array[leftIndex] > currVal) {
                array[rightIndex] = array[leftIndex];
                break;
            }
            leftIndex++;
        }
    }
    array[leftIndex] = currVal;
    quickSort(array, left, leftIndex-1);
    quickSort(array, rightIndex+1, right);
}

let array = [[1,2,2],[3,4,5,5],[6,7,8,9,[11,12,[12,13,[14]]]],10];
const res = handler(array);
console.log(res)
