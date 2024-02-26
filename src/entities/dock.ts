import { Container } from '../lib/pixi.mjs'
import { TweenManager } from '../lib/tween.js'

import { type Ship } from './ship.js'

import {
  LOAD_ANIMATION_ENDPOINT,
  DELIVER_ANIMATION_ENDPOINT
} from '../constants/animation-endpoint'
import { ShipStatus } from '../constants/ship-statuses'

export class Dock extends Container {
  _shipsInDock: Ship[]

  constructor(x: number, y: number, appTicker: any) {
    super()
    this._view = new Container()

    this._shipsInDock = []

    this._view.x = x
    this._view.y = y
    this._appTicker = appTicker
    this._shipCounter = 0
  }

  dockShip(ship: Ship) {
    setTimeout(() => {
      ship.view.y = 5
      ship.view.x = this.shipsCounter * 120 + 10

      this._shipsInDock.push(ship)
      this._view.addChild(ship.view)
      this._shipCounter++
    }, 3300)
  }

  sendShipFromDockToPortForDeliver(moorageIndex: number = 0) {
    if (this._shipsInDock.length > 0) {
      const shipToSend = this._shipsInDock[0]

      shipToSend.state = ShipStatus.DELIVERING
      shipToSend.state = ShipStatus.GOING

      const tweenManager = new TweenManager(this._appTicker)

      setTimeout(() => {
        tweenManager.createTween(
          shipToSend.view,
          DELIVER_ANIMATION_ENDPOINT.duration.xs,
          DELIVER_ANIMATION_ENDPOINT.EXIT_FROM_DOCK
        )

        this._shipsInDock.forEach((ship, index) => {
          tweenManager.createTween(ship.view, DELIVER_ANIMATION_ENDPOINT.duration.xs, {
            x: 10 + index * 120,
            y: 5
          })
        })
      }, 1000)

      setTimeout(() => {
        tweenManager.createTween(
          shipToSend.view,
          DELIVER_ANIMATION_ENDPOINT.duration.xs,
          DELIVER_ANIMATION_ENDPOINT.ENTER_PORT
        )
      }, 2000)

      setTimeout(() => {
        tweenManager.createTween(shipToSend.view, DELIVER_ANIMATION_ENDPOINT.duration.md, {
          x: DELIVER_ANIMATION_ENDPOINT.DOCKING.x,
          y: DELIVER_ANIMATION_ENDPOINT.DOCKING.y[
            moorageIndex as keyof typeof DELIVER_ANIMATION_ENDPOINT.DOCKING.y
          ]
        })
      }, 3000)

      setTimeout(() => {
        shipToSend.state = ShipStatus.DELIVERED

        setTimeout(() => {
          tweenManager.createTween(
            shipToSend.view,
            DELIVER_ANIMATION_ENDPOINT.duration.xs,
            DELIVER_ANIMATION_ENDPOINT.EXIT_FROM_PORT
          )
        }, 1000)

        setTimeout(() => {
          tweenManager.createTween(
            shipToSend.view,
            DELIVER_ANIMATION_ENDPOINT.duration.xl,
            DELIVER_ANIMATION_ENDPOINT.EXIT_FROM_SEA
          )
        }, 2000)

        setTimeout(() => {
          this._view.removeChild(shipToSend.view)
        }, 6000)
      }, 5000)

      this._shipsInDock.shift()
    }
  }

  sendShipFromDockToPortForLoad(moorageIndex: number = 0) {
    if (this._shipsInDock.length > 0) {
      const shipToSend = this._shipsInDock[0]
      shipToSend.state = ShipStatus.PIKING_UP

      const tweenManager = new TweenManager(this._appTicker)

      setTimeout(() => {
        tweenManager.createTween(
          shipToSend.view,
          LOAD_ANIMATION_ENDPOINT.duration.xs,
          LOAD_ANIMATION_ENDPOINT.EXIT_FROM_DOCK
        )

        this._shipsInDock.forEach((ship, index) => {
          console.log(this._shipsInDock.length)
          tweenManager.createTween(ship.view, LOAD_ANIMATION_ENDPOINT.duration.xs, {
            x: 10 + index * 120,
            y: 5
          })
        })
      }, 1000)

      setTimeout(() => {
        tweenManager.createTween(
          shipToSend.view,
          LOAD_ANIMATION_ENDPOINT.duration.xs,
          LOAD_ANIMATION_ENDPOINT.ENTER_PORT
        )
      }, 2000)

      setTimeout(() => {
        tweenManager.createTween(shipToSend.view, LOAD_ANIMATION_ENDPOINT.duration.md, {
          x: LOAD_ANIMATION_ENDPOINT.DOCKING.x,
          y: LOAD_ANIMATION_ENDPOINT.DOCKING.y[
            moorageIndex as keyof typeof LOAD_ANIMATION_ENDPOINT.DOCKING.y
          ]
        })
      }, 3000)

      setTimeout(() => {
        shipToSend.state = ShipStatus.PICKED_UP
        this._shipsInDock.shift()

        setTimeout(() => {
          tweenManager.createTween(
            shipToSend.view,
            LOAD_ANIMATION_ENDPOINT.duration.xs,
            LOAD_ANIMATION_ENDPOINT.ENTER_PORT
          )
        }, 1000)

        setTimeout(() => {
          tweenManager.createTween(
            shipToSend.view,
            LOAD_ANIMATION_ENDPOINT.duration.xl,
            LOAD_ANIMATION_ENDPOINT.EXIT_FROM_SEA
          )
        }, 2000)

        setTimeout(() => {
          this._view.removeChild(shipToSend.view)
        }, 6000)
      }, 5000)
    }
  }

  get shipsCounter(): number {
    return this._shipsInDock.length
  }

  get view() {
    return this._view
  }
}
