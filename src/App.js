import React from 'react'
import './App.css'
// function Circle (x, y, radius) {
//   this.x = x
//   this.y = y
//   this.radius = radius
//   this.isSelected = false // 是否选中
// }
class Circle {
  constructor(x, y, radius) {
    this.x = x
    this.y = y
    this.radius = radius
    this.isSelected = false // 是否选中
  }
}
class App extends React.Component {
  constructor(props) {
    super(props)
    const a = this.canvas = React.createRef();
    console.log(a)
    this.state = {
      date: new Date(),
      circles: [],
      isDragging: false,
      previousSelectedCircle: null,
      context: null
    }
  }
  componentDidMount() {
    this.setState({
      context: this.canvas.current.getContext("2d")
    })
  }

  // 在某个范围内生成随机数
  randomFromTo(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from)
  }

  // 添加圆圈事件
  addRandomCircle() {
    console.log(this.canvas.current)
    // console.log(this)
    // 为圆圈计算一个随机大小和位置
    var radius = this.randomFromTo(10, 60)
    var x = this.randomFromTo(0, this.canvas.current.width)
    var y = this.randomFromTo(0, this.canvas.current.height)
    // // 创建一个新圆圈
    var circle = new Circle(x, y, radius)
    // // // 把它保存在数组中
    this.state.circles.push(circle)
    // 重新绘制画布
    this.drawCircles()
  }
  drawCircles() {
    console.log(99999)
    // 清除画布，准备绘制
    this.state.context.clearRect(0, 0, this.canvas.current.width, this.canvas.current.height)

    // 遍历所有圆圈
    for (let i = 0; i < this.state.circles.length; i++) {
      var circle = this.state.circles[i]
      console.log(circle.x, '--', circle.y)
      // 绘制圆圈
      this.state.context.globalAlpha = 0.85
      this.state.context.beginPath()
      this.state.context.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
      this.state.context.fillStyle = circle.color
      this.state.context.strokeStyle = 'red'

      if (circle.isSelected) {
        this.state.context.lineWidth = 5
      } else {
        this.state.context.lineWidth = 1
      }
      this.state.context.fill()
      this.state.context.stroke()
      this.setState({
        context: this.state.context
      })
    }
  }

  // 清空画布事件
  clearCanvas() {
    // 去除所有圆圈
    this.setState({
      circles: []
    })

    // 重新绘制画布.
    this.drawCircles()
  }

  canvasClick(e) {

    console.log(this)
    console.log(`canvas.offsetLeft++${e.pageX}`)
    console.log(`canvas.offsetTop---${e.pageY}`)
    // 取得画布上被单击的点
    var clickX = e.pageX - this.canvas.current.offsetLeft
    var clickY = e.pageY - this.canvas.current.offsetTop

    // 查找被单击的圆圈
    for (let i = this.state.circles.length - 1; i >= 0; i--) {
      var circle = this.state.circles[i]
      // 使用勾股定理计算这个点与圆心之间的距离
      var distanceFromCenter = Math.sqrt(
        Math.pow(circle.x - clickX, 2) + Math.pow(circle.y - clickY, 2)
      )
      // 判断这个点是否在圆圈中
      if (distanceFromCenter <= circle.radius) {
        // 清除之前选择的圆圈
        if (this.state.previousSelectedCircle != null) { this.state.previousSelectedCircle.isSelected = false }
        this.state.previousSelectedCircle = circle

        // 选择新圆圈
        circle.isSelected = true

        // 使圆圈允许拖拽
        this.setState({
          isDragging: true
        })

        // 更新显示
        this.drawCircles()

        // 停止搜索
        return
      }
    }
  }
  stopDragging(e) {
    // 判断圆圈是否开始拖拽
    if (this.state.isDragging == true) {
      // 判断拖拽对象是否存在
      if (this.state.previousSelectedCircle != null) {
        // 取得鼠标位置
        var x = e.pageX - this.canvas.current.offsetLeft
        var y = e.pageY - this.canvas.current.offsetTop

        // 将圆圈移动到鼠标位置
        this.state.previousSelectedCircle.x = x
        this.state.previousSelectedCircle.y = y

        this.setState({
          previousSelectedCircle: this.state.previousSelectedCircle
        })
        // 更新画布
        this.drawCircles()
      }
    }
  }
  dragCircle(e) {
    this.setState({
      isDragging: false
    })

  }
  render() {
    return (
      <div className='App'>
        <canvas
          onMouseDown={this.canvasClick.bind(this)}
          onMouseMove={this.stopDragging.bind(this)}
          // onMouseOut={this.stopDragging.bind(this)}
          onMouseUp={this.dragCircle.bind(this)}
          ref={this.canvas}
          width='400'
          height='300'
        />
        <div>
          <button onClick={this.addRandomCircle.bind(this)}>添加圆圈</button>
          <button onClick={this.clearCanvas.bind(this)}>清空画布</button>
        </div>
      </div>
    )
  }
}

export default App
