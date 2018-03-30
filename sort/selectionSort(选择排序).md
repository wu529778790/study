# 选择排序

## 1.算法步骤

1. 首先在未排序的序列中找到最小元素，放到序列起始位置
2. 再从剩余未排序元素中继续找最小的，放到已排序的末尾
3. 重复第二步，知道所有元素排序完毕

## 动图演示

![动图演示](img/selectionSort.gif)

## js 实现
```
    function selectionSort (arr) {
      let len = arr.length
      let minIndex, temp
      for (let i = 0; i < len - 1; i++) {
        minIndex = i;
        for (let j = i + 1;j < len; j++) {
          if (arr[j] < arr[minIndex]) {
            minIndex = j
          }
        }
        console.log(arr[minIndex])
        temp = arr[minIndex]
        arr[minIndex] = arr[i]
        arr[i] = temp
        console.log(arr)
      }
    }
```