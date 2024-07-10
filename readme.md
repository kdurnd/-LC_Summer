# Daily Report

## 7.8
完成数据结构内容，由于js的特性及自带函数，部分实现与c语言有所区别

## 7.9
完成具有动效的`checkbox`的封装
完成双滑块轨道的封装

## 7.10
尝试完成切换版本的switch按钮的动态效果，但仍有部分效果无法实现
> 先尝试通过`css`的`:active`选择器完成，但其效果是从点击位置向四周扩散，遂只能使用js。
> 该效果在长按时会一直生效，点按时会完整生效一次，因此需要监听多个事件，也需要及时清除事件，在实现过程中，因为对`removeEventListener`了解有误导致耽误了大量时间，在查阅MDN官网中，发现`AbortController`很适合实现事件监听器的清除(文心一言很倔强的认为`AbortController`不能用于此功能......)
> 然而，依旧没有解决在切换时的动画效果的瞬间过渡 GG