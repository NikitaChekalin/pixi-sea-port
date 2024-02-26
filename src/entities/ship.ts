import { Container, Graphics, Text, type DisplayObject } from '../lib/pixi.mjs'

import { Color } from '../constants/colors'
import { ShipStatus } from '../constants/ship-statuses'

export class Ship extends Container {
  constructor(status: ShipStatus = ShipStatus.WAITING) {
    super()
    this._view = new Container()
    this._state = status

    this._shipGraphics = new Graphics()
    this._view.addChild(this._shipGraphics)

    const shipGoingTextConfig = {
      text: 'Going to moorage..',
      fill: Color.BLACK,
      fontSize: 8
    }

    this._shipGoingText = new Text(shipGoingTextConfig.text, shipGoingTextConfig)
    this._shipGoingText.anchor.set(0.5)
    this._shipGoingText.position.set(50, 25)
    this._shipGoingText.visible = false
    this._view.addChild(this._shipGoingText)

    this.updateShipGraphics()
  }

  private updateShipGraphics(): void {
    this._shipGraphics.clear()

    switch (this._state) {
      case ShipStatus.WAITING:
        this._shipGraphics.lineStyle(6, Color.GREEN)
        break
      case ShipStatus.GOING:
        this._shipGoingText.visible = true
        this._shipGraphics.lineStyle(6, Color.RED)
        this._shipGraphics.beginFill(Color.RED)
        break
      case ShipStatus.DELIVERING:
        this._shipGoingText.visible = false
        this._shipGraphics.lineStyle(6, Color.RED)
        this._shipGraphics.beginFill(Color.RED)
        break
      case ShipStatus.DELIVERED:
        this._shipGoingText.visible = false
        this._shipGraphics.lineStyle(6, Color.RED)
        this._shipGraphics.beginFill(Color.WHITE)
        break
      case ShipStatus.PIKING_UP:
        this._shipGraphics.lineStyle(6, Color.GREEN)
        this._shipGraphics.beginFill(Color.WHITE)
        break
      case ShipStatus.PICKED_UP:
        this._shipGraphics.lineStyle(6, Color.GREEN)
        this._shipGraphics.beginFill(Color.GREEN)
        break

      default:
        break
    }

    this._shipGraphics.drawRect(0, 0, 100, 50)
    this._shipGraphics.endFill()
  }

  set state(newState: ShipStatus) {
    this._state = newState
    this.updateShipGraphics()
  }

  get state(): ShipStatus {
    return this._state
  }

  get view(): DisplayObject {
    return this._view
  }
}
