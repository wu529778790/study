# 插入排序

## 算法步骤

1. 将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素看成是未排序序列
2. 从头到尾扫描未排序序列，将扫描到的每个元素插入到有序序列适当的位置。

## js实现

```
function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}

自己写的好理解的:

    function insertionSort (arr) {
      for (let i = 1; i < arr.length; i++) {
        if (arr[i-1] > arr[i]) {
          let temp = arr[i-1]
          arr[i-1] = arr[i]
          arr[i] = temp
          if (i>1) {
            for (let j = i-1; j > 0;j--) {
              if (arr[j-1] > arr[j]) {
                let temp = arr[j-1]
                arr[j-1] = arr[j]
                arr[j] = temp
              }
            }
          }
        }
      }
    }
```