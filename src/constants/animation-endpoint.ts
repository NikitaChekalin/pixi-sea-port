import {
  MOORAGE_COORDINATES_DELIVER_FROM_DOCK,
  MOORAGE_COORDINATES_DELIVER_FROM_SHIP_FACTORY,
  MOORAGE_COORDINATES_LOAD_FROM_DOCK
} from './moorage-coordinates'

export const LOAD_ANIMATION_ENDPOINT = {
  EXIT_FROM_DOCK: {
    x: 10,
    y: 80
  },
  ENTER_PORT: {
    x: -150,
    y: 80
  },
  DOCKING: {
    x: MOORAGE_COORDINATES_LOAD_FROM_DOCK.x,
    y: MOORAGE_COORDINATES_LOAD_FROM_DOCK.y
  },
  EXIT_FROM_PORT: {
    x: -150,
    y: 80
  },
  EXIT_FROM_SEA: {
    x: 600,
    y: 80
  },
  SHIP_REPLACEMENT: {
    x: 10,
    y: 5
  },
  duration: {
    xs: 1000,
    md: 2000,
    xl: 5000
  }
}

export const DELIVER_ANIMATION_ENDPOINT = {
  EXIT_FROM_DOCK: {
    x: 10,
    y: -60
  },
  ENTER_PORT: {
    x: -150,
    y: -60
  },
  DOCKING: {
    x: MOORAGE_COORDINATES_DELIVER_FROM_DOCK.x,
    y: MOORAGE_COORDINATES_DELIVER_FROM_DOCK.y
  },
  EXIT_FROM_PORT: {
    x: -150,
    y: -60
  },
  EXIT_FROM_SEA: {
    x: 600,
    y: -60
  },
  SHIP_REPLACEMENT: {
    x: 10,
    y: 5
  },
  duration: {
    xs: 1000,
    md: 2000,
    xl: 5000
  }
}

export const ANIMATION_ENDPOINT_FROM_SHIP_FACTORY = {
  EXIT_FROM_SHIP_FACTORY: { x: -350, y: 80 },
  ENTER_PORT: { x: -650, y: 80 },
  DOCKING: {
    x: MOORAGE_COORDINATES_DELIVER_FROM_SHIP_FACTORY.x,
    y: MOORAGE_COORDINATES_DELIVER_FROM_SHIP_FACTORY.y
  },
  EXIT_FROM_PORT: { x: -650, y: 160 },
  EXIT_FROM_SEA: { x: 650, y: 160 },

  duration: {
    xs: 1000,
    md: 2000,
    xl: 5000
  }
}
