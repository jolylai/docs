---
title: 'MouseEvent'
date: '2019-04-25'
keywords:
    - 'MouseEvent'
    - 'javascript'

sidebar: 'javascript'
---

## clientX 和 clientY

事件发生时的应用客户端区域的水平坐标 (与页面坐标不同)。例如，不论页面是否有水平滚动，当你点击客户端区域的左上角时，鼠标事件的 clientX 值都将为 0 。最初这个属性被定义为长整型（long integer），如今 CSSOM 视图模块将其重新定义为双精度浮点数（double float）

## screenX 和 screenY

相对于设备屏幕左上角（0，0）的坐标

## offsetX 和 offsetY

事件对象与目标节点的内填充边（padding edge）在 X 轴和 Y 轴方向上的偏移量。

# pageX 和 pageY

相对于整个网页左上角（0，0）的坐标
