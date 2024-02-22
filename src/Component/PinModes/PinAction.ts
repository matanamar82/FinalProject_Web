export enum PinModeActions {
    CREATE = 'create',
    INSERT = "update",
    MODIFY = 'modify',
    NONE = 'none',
    BLOCK = 'block'
}


export enum CURSOR_STYLE {
    CROSSHAIR = 'crosshair',
    DEFAULT = 'default',
    NONE = 'none',
    BLOCK = "not-allowed",
    
}

export type PinAction = (typeof PinModeActions)[keyof typeof PinModeActions];