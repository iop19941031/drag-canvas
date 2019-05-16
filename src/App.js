import React from 'react'
import './App.css'
// function Circle (x, y, radius) {
//   this.x = x
//   this.y = y
//   this.radius = radius
//   this.isSelected = false // 是否选中
// }
class Circle {
  constructor (x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.isSelected = false // 是否选中
  }
}
class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: new Date(),
      canvas: null,
      circles: [22],
      isDragging: false,
      previousSelectedCircle: null
    }
  }
  componentDidMount () {
    this.setState({
      // canvas: this.ref.canvas.getContext('2d')
    })
  }
  // 在某个范围内生成随机数
  randomFromTo (from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from)
  }

  // 添加圆圈事件
  addRandomCircle () {
    // console.log(this.state.circles)
    // 为圆圈计算一个随机大小和位置
    // var radius = this.randomFromTo(10, 60)
    // var x = this.randomFromTo(0, this.state.canvas.width)
    // var y = this.randomFromTo(0, this.state.canvas.height)
    // // 创建一个新圆圈
    // var circle = new Circle(x, y, radius)
    // // 把它保存在数组中
    // this.state.circles.push(circle)
    // 重新绘制画布
    // drawCircles()
  }
  // drawCircles () {
  //   // 清除画布，准备绘制
  //   context.clearRect(0, 0, canvas.width, canvas.height)

  //   // 遍历所有圆圈
  //   for (var i = 0; i < circles.length; i++) {
  //     var circle = circles[i]

  //     // 绘制圆圈
  //     context.globalAlpha = 0.85
  //     context.beginPath()
  //     context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
  //     context.fillStyle = circle.color
  //     context.strokeStyle = 'red'

  //     if (circle.isSelected) {
  //       context.lineWidth = 5
  //     } else {
  //       context.lineWidth = 1
  //     }
  //     context.fill()
  //     context.stroke()
  //   }
  // }

  // 清空画布事件
  // clearCanvas () {
  //   // 去除所有圆圈
  //   circles = []

  //   // 重新绘制画布.
  //   drawCircles()
  // }

  // canvasClick (e) {
  //   console.log(`canvas.offsetLeft++${e.pageX}`)
  //   console.log(`canvas.offsetTop---${e.pageY}`)
  //   // 取得画布上被单击的点
  //   var clickX = e.pageX - canvas.offsetLeft
  //   var clickY = e.pageY - canvas.offsetTop

  //   // 查找被单击的圆圈
  //   for (var i = circles.length - 1; i >= 0; i--) {
  //     var circle = circles[i]
  //     // 使用勾股定理计算这个点与圆心之间的距离
  //     var distanceFromCenter = Math.sqrt(
  //       Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2)
  //     )
  //     // 判断这个点是否在圆圈中
  //     if (distanceFromCenter <= circle.radius) {
  //       // 清除之前选择的圆圈
  //       if (previousSelectedCircle != null) { previousSelectedCircle.isSelected = false }
  //       previousSelectedCircle = circle

  //       // 选择新圆圈
  //       circle.isSelected = true

  //       // 使圆圈允许拖拽
  //       isDragging = true

  //       // 更新显示
  //       drawCircles()

  //       // 停止搜索
  //       return
  //     }
  //   }
  // }
  // stopDragging () {
  //   isDragging = false
  // }
  // dragCircle (e) {
  //   // 判断圆圈是否开始拖拽
  //   if (isDragging == true) {
  //     // 判断拖拽对象是否存在
  //     if (previousSelectedCircle != null) {
  //       // 取得鼠标位置
  //       var x = e.pageX - canvas.offsetLeft
  //       var y = e.pageY - canvas.offsetTop

  //       // 将圆圈移动到鼠标位置
  //       previousSelectedCircle.x = x
  //       previousSelectedCircle.y = y

  //       // 更新画布
  //       drawCircles()
  //     }
  //   }
  // }
  render () {
    return (
      <div className='App'>
        <canvas
          onMouseDown={this.stopDragging}
          onMouseOut={this.stopDragging}
          onMouseUp={this.dragCircle}
          onMouseMove={this.stopDragging}
          ref='canvas'
          width='400'
          height='300'
        />
        <div>
          <button onClick={this.addRandomCircle}>添加圆圈</button>
          <button onClick={this.clearCanvas}>清空画布</button>
        </div>
      </div>
    )
  }
}

export default App
