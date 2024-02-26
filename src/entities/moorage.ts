import { Container, Graphics, Text } from '../lib/pixi.mjs'
import { Color } from '../constants/colors'

export class Moorage extends Container {
  private _hasCargo: boolean
  private _isShip: boolean

  constructor(index: number = 0) {
    super()
    this._view = new Container()
    this._hasCargo = false
    this._isShip = false
    this._index = index

    this._moorageGraphics = new Graphics()
    this._view.addChild(this._moorageGraphics)

    this._waitingCargo = new Text('Ship is going..', {
      fill: Color.BLACK,
      fontSize: 8
    })

    this._waitingCargo.anchor.set(0.5)
    this._waitingCargo.position.set(30, 50)
    this._waitingCargo.visible = false
    this._view.addChild(this._waitingCargo)

    this.updateMoorageGraphics()
  }

  hasCargo(): boolean {
    return this._hasCargo
  }

  hasShip(): boolean {
    return this._isShip
  }

  toggleCargo(value: boolean): void {
    this._hasCargo = value
    this.updateMoorageGraphics()
  }

  deliverCargoToMoorage(): void {
    if (!this._hasCargo && !this._isShip) {
      this._isShip = true
      this._waitingCargo.visible = true
      this.updateMoorageGraphics()

      setTimeout(() => {
        this.toggleCargo(true)
        this._isShip = false
        this._waitingCargo.visible = false
      }, 5000)
    }
  }

  loadCargoOnShip(): void {
    if (this._hasCargo) {
      this._isShip = true
      this._waitingCargo.visible = true
      this.updateMoorageGraphics()

      setTimeout(() => {
        this.toggleCargo(false)
        this._isShip = false
        this._waitingCargo.visible = false
      }, 5000)
    }
  }

  private updateMoorageGraphics(): void {
    this._moorageGraphics.clear()

    if (this._hasCargo) {
      this._moorageGraphics.beginFill(Color.YELLOW)
    } else {
      this._moorageGraphics.beginFill(Color.WHITE)
    }

    this._moorageGraphics.lineStyle(6, Color.YELLOW)
    this._moorageGraphics.drawRect(0, 0, 50, 100)
    this._moorageGraphics.endFill()
  }

  get view() {
    return this._view
  }
}
