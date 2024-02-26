import { Container } from '../lib/pixi.mjs'
import { TweenManager } from '../lib/tween.js'

import { Ship } from './ship'
import { SeaPort } from './port'

import { ShipStatus } from '../constants/ship-statuses'
import { AMOUNT_OF_SHIPS } from '../constants/pixi-application'
import { ANIMATION_ENDPOINT_FROM_SHIP_FACTORY } from '../constants/animation-endpoint'

const statuses = [ShipStatus.WAITING, ShipStatus.DELIVERING]

export class ShipFactory extends Container {
  _shipsForDeliver: Ship[]
  _shipsForLoad: Ship[]
  _shipCounter: number

  constructor(appTicker: any) {
    super()

    this._view = new Container()
    this._seaPort = new SeaPort()

    this._view.x = 850
    this._view.y = 160

    this._shipsForDeliver = []
    this._shipsForLoad = []
    this._shipCounter = 0
    this._appTicker = appTicker

    this._interval = setInterval(() => {
      if (this._shipCounter < AMOUNT_OF_SHIPS) {
        this.createShip()
      }
    }, 8000)
  }

  private getRandomShipIndexForCreate(): number {
    return Math.floor(Math.random() * 2)
  }

  private createShip(): void {
    const randomStatus = statuses[this.getRandomShipIndexForCreate()]
    const ship = new Ship(randomStatus)

    ship.view.y = this._shipCounter * (ship.view.height + 5)

    if (randomStatus === ShipStatus.DELIVERING) {
      this._shipsForDeliver.push(ship)
    } else {
      this._shipsForLoad.push(ship)
    }

    this._view.addChild(ship.view)
    this._shipCounter++
  }

  sentShipToMoorageForDeliver(moorageIndex: number = 0): void {
    if (this._shipsForDeliver.length !== 0) {
      const shipToSend = this._shipsForDeliver[0]
      shipToSend.state = ShipStatus.DELIVERING
      shipToSend.state = ShipStatus.GOING

      const tweenManager = new TweenManager(this._appTicker)

      setTimeout(() => {
        tweenManager.createTween(
          shipToSend.view,
          ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.duration.xs,
          ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.EXIT_FROM_SHIP_FACTORY
        )
      }, 1000)

      setTimeout(() => {
        tweenManager.createTween(
          shipToSend.view,
          ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.duration.xs,
          ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.ENTER_PORT
        )
      }, 2000)

      setTimeout(() => {
        tweenManager.createTween(
          shipToSend.view,
          ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.duration.md,
          {
            x: ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.DOCKING.x,
            y: ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.DOCKING.y[
              moorageIndex as keyof typeof ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.DOCKING.y
            ]
          }
        )
      }, 3000)

      setTimeout(() => {
        shipToSend.state = ShipStatus.DELIVERED

        setTimeout(() => {
          tweenManager.createTween(
            shipToSend.view,
            ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.duration.xs,
            ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.EXIT_FROM_PORT
          )
        }, 1000)

        setTimeout(() => {
          tweenManager.createTween(
            shipToSend.view,
            ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.duration.xl,
            ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.EXIT_FROM_SEA
          )
        }, 2000)

        setTimeout(() => {
          this._view.removeChild(shipToSend.view)
        }, 6000)
      }, 5000)

      this._shipsForDeliver.shift()
    }
  }

  sentShipToMoorageForLoad(moorageIndex: number = 0): void {
    if (this._shipsForLoad.length !== 0) {
      const shipToSend = this._shipsForLoad[0]
      shipToSend.state = ShipStatus.PIKING_UP

      const tweenManager = new TweenManager(this._appTicker)

      setTimeout(() => {
        tweenManager.createTween(
          shipToSend.view,
          ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.duration.xs,
          ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.EXIT_FROM_SHIP_FACTORY
        )
      }, 1000)

      setTimeout(() => {
        tweenManager.createTween(
          shipToSend.view,
          ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.duration.xs,
          ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.ENTER_PORT
        )
      }, 2000)

      setTimeout(() => {
        tweenManager.createTween(
          shipToSend.view,
          ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.duration.md,
          {
            x: ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.DOCKING.x,
            y: ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.DOCKING.y[
              moorageIndex as keyof typeof ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.DOCKING.y
            ]
          }
        )
      }, 3000)

      setTimeout(() => {
        shipToSend.state = ShipStatus.PICKED_UP

        setTimeout(() => {
          tweenManager.createTween(
            shipToSend.view,
            ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.duration.xs,
            ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.EXIT_FROM_PORT
          )
        }, 1000)

        setTimeout(() => {
          tweenManager.createTween(
            shipToSend.view,
            ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.duration.xl,
            ANIMATION_ENDPOINT_FROM_SHIP_FACTORY.EXIT_FROM_SEA
          )
        }, 2000)

        setTimeout(() => {
          this._view.removeChild(shipToSend.view)
        }, 6000)
      }, 5000)

      this._shipsForLoad.shift()
    }
  }

  sentShipToDockForDeliver(): void {
    if (this._shipsForDeliver.length !== 0) {
      const shipToSend = this._shipsForDeliver[0]
      shipToSend.state = ShipStatus.DELIVERING

      const tweenManager = new TweenManager(this._appTicker)

      setTimeout(() => {
        tweenManager.createTween(shipToSend.view, 2000, { x: -270, y: 225 })
      }, 1000)

      setTimeout(() => {
        this._shipsForDeliver.shift()
        this._view.removeChild(shipToSend.view)
      }, 3200)
    }
  }

  sentShipToDockForLoad(): void {
    if (this._shipsForLoad.length !== 0) {
      const shipToSend = this._shipsForLoad[0]
      shipToSend.state = ShipStatus.WAITING

      const tweenManager = new TweenManager(this._appTicker)

      setTimeout(() => {
        tweenManager.createTween(shipToSend.view, 2000, { x: -270, y: 10 })
      }, 1000)

      setTimeout(() => {
        this._shipsForLoad.shift()
        this._view.removeChild(shipToSend.view)
      }, 3200)
    }
  }

  get view() {
    return this._view
  }
}
