import { Container, Graphics } from '../lib/pixi.mjs'

import { Moorage } from './moorage'

import { Color } from '../constants/colors'
import { AMOUNT_OF_MOORAGES } from '../constants/pixi-application'

export class SeaPort extends Container {
  private moorages: Moorage[]

  private createTopPortEntry(): void {
    const topEntry = new Graphics()
    topEntry.beginFill(Color.YELLOW as any)
    topEntry.drawRect(0, 0, 8, 220)
    topEntry.endFill()
    topEntry.position.set(300, 0)
    this._view.addChild(topEntry)
  }

  private createBottomPortEntry(): void {
    const bottomEntry = new Graphics()
    bottomEntry.beginFill(Color.YELLOW as any)
    bottomEntry.drawRect(0, 0, 8, 220)
    bottomEntry.endFill()
    bottomEntry.position.set(300, 380)
    this._view.addChild(bottomEntry)
  }

  private createPortEntries(): void {
    this.createTopPortEntry()
    this.createBottomPortEntry()
  }

  constructor() {
    super()
    this._view = new Container()
    this.moorages = []

    for (let i = 0; i < AMOUNT_OF_MOORAGES; i++) {
      const moorage = new Moorage(i)
      moorage.view.y = i * 120 + 60
      this.moorages.push(moorage)
      this._view.addChild(moorage.view)
    }

    this.createPortEntries()
  }

  findAvailableMoorageToDeliver(): Moorage | undefined {
    return this.moorages.find((moorage) => !moorage.hasCargo() && !moorage.hasShip())
  }

  findAvailableMoorageToLoad(): Moorage | undefined {
    return this.moorages.find((moorage) => moorage.hasCargo() && !moorage.hasShip())
  }

  get view() {
    return this._view
  }
}
