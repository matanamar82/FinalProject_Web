export const eventTypes = {
    CLICK: 'click'
} as const

export type EventTypes = (typeof eventTypes)[keyof typeof eventTypes];