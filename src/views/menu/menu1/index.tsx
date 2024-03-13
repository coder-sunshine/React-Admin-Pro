import React, { useEffect, useRef } from 'react'
import qrCode from '@/assets/images/qrCode.png'

const Menu1: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      context!.fillStyle = '#19af5f'
      context!.fillRect(0, 0, 480, 800)

      const width = 260 // 正方形的宽度
      const height = 260 // 正方形的高度
      const cornerRadius = 10 // 圆角的半径
      const fillColor = '#fff' // 填充色

      const drawRoundedRect = (ctx: any) => {
        ctx.fillStyle = fillColor
        ctx.beginPath()
        // 480 - 200 = 280, 一边留白 280 / 2 = 140
        const leftTopX = (480 - width) / 2 + cornerRadius
        const moveY = (800 - height) / 2

        ctx.moveTo(leftTopX, moveY)

        const rightTopX = (480 - width) / 2 + cornerRadius + width - cornerRadius

        ctx.lineTo(rightTopX, moveY)
        ctx.arcTo(rightTopX + cornerRadius, moveY, rightTopX + cornerRadius, moveY + cornerRadius, cornerRadius)

        const rightBottomX = rightTopX + cornerRadius
        ctx.lineTo(rightBottomX, moveY + height - cornerRadius)
        ctx.arcTo(rightBottomX, moveY + height, rightBottomX - cornerRadius, moveY + height, cornerRadius)

        const leftBottomX = leftTopX
        ctx.lineTo(leftBottomX, moveY + height)
        ctx.arcTo(
          leftBottomX - cornerRadius,
          moveY + height,
          leftBottomX - cornerRadius,
          moveY + height - cornerRadius,
          cornerRadius
        )

        ctx.lineTo(leftTopX - cornerRadius, moveY + cornerRadius)
        ctx.arcTo(leftTopX - cornerRadius, moveY, leftTopX, moveY, cornerRadius)

        ctx.closePath()
        ctx.fill()
      }

      drawRoundedRect(context)

      const loadImage = async () => {
        const image = new Image()
        image.src = qrCode

        await image.decode()

        const canvasWidth = 480
        const canvasHeight = 800
        const aspectRatio = image.width / image.height
        const maxImageWidth = canvasWidth - 200
        const maxImageHeight = canvasHeight - 200

        let imageWidth, imageHeight
        if (image.width > maxImageWidth || image.height > maxImageHeight) {
          if (maxImageWidth / aspectRatio < maxImageHeight) {
            imageWidth = maxImageWidth
            imageHeight = maxImageWidth / aspectRatio
          } else {
            imageWidth = maxImageHeight * aspectRatio
            imageHeight = maxImageHeight
          }
        } else {
          imageWidth = image.width
          imageHeight = image.height
        }

        const imageX = (canvasWidth - imageWidth) / 2
        const imageY = (canvasHeight - imageHeight) / 2

        context!.drawImage(image, imageX, imageY, imageWidth, imageHeight)

        context!.font = '30px Arial'
        context!.fillStyle = '#fff'
        context!.textAlign = 'center'

        const textTop1 = '上海智慧电梯'
        const textTopX1 = canvasWidth / 2
        const textTopY1 = imageY - 100

        context!.fillText(textTop1, textTopX1, textTopY1)

        const textTop2 = 'Shanghai smart Elevator'
        context!.font = '20px Arial'
        const textTopX2 = canvasWidth / 2
        const textTopY2 = imageY - 50
        context!.fillText(textTop2, textTopX2, textTopY2)

        context!.font = '20px Arial'
        const textBottom = '上海市市场监督管理局'
        const textBottomX = canvasWidth / 2
        const textBottomY = imageY + imageHeight + 10 + 20

        context!.fillText(textBottom, textBottomX, textBottomY)
      }

      loadImage()
    }
  }, [])

  const exportImage = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const dataURL = canvas.toDataURL('image/jpeg', 1)
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'output_image.jpg'
      link.click()
    }
  }

  return (
    <div>
      <canvas ref={canvasRef} width={480} height={800} />
      <button onClick={exportImage}>Export Image</button>
    </div>
  )
}

export default Menu1
