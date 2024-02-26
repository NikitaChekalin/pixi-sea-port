import * as PIXI from './lib/pixi.mjs'

import { Dock } from './entities/dock'
import { SeaPort } from './entities/port'
import { ShipFactory } from './entities/ship-factory'

import { PIXI_APPLICATION_CONFIG } from './constants/pixi-application'

const app = new PIXI.Application(PIXI_APPLICATION_CONFIG) as any
document.body.appendChild(app.view)

const deliverDock = new Dock(310, 380, app.ticker)
const loadDock = new Dock(310, 165, app.ticker)
const shipFactory = new ShipFactory(app.ticker)
const seaPort = new SeaPort()

setInterval(() => {
  const ship = shipFactory._shipsForDeliver[0]
  if (ship) {
    const moorage = seaPort.findAvailableMoorageToDeliver()

    if (moorage) {
      shipFactory.sentShipToMoorageForDeliver(moorage._index)
      moorage.deliverCargoToMoorage()
    }
    if (!moorage) {
      shipFactory.sentShipToDockForDeliver()
      deliverDock.dockShip(ship)
    }
  }
}, 5000)

setInterval(() => {
  const ship = shipFactory._shipsForLoad[0]
  if (ship) {
    const moorage = seaPort.findAvailableMoorageToLoad()

    if (moorage) {
      shipFactory.sentShipToMoorageForLoad(moorage._index)
      moorage.loadCargoOnShip()
    }
    if (!moorage) {
      shipFactory.sentShipToDockForLoad()
      loadDock.dockShip(ship)
    }
  }
}, 5000)

setInterval(() => {
  const moorage = seaPort.findAvailableMoorageToDeliver()
  const ship = deliverDock._shipsInDock[0]

  if (moorage && ship) {
    deliverDock.sendShipFromDockToPortForDeliver(moorage._index)
    moorage.deliverCargoToMoorage()
  }
}, 6000)

setInterval(() => {
  const moorage = seaPort.findAvailableMoorageToLoad()
  const ship = loadDock._shipsInDock[0]

  if (moorage && ship) {
    loadDock.sendShipFromDockToPortForLoad(moorage._index)
    moorage.loadCargoOnShip()
  }
}, 6000)

app.stage.addChild(seaPort.view)
app.stage.addChild(deliverDock.view)
app.stage.addChild(loadDock.view)
app.stage.addChild(shipFactory.view)
