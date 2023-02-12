class EventEmitter {
    events: Record<string, Function | null>

    constructor() {
        this.events = {}
    }

    subscribe(name: string, fn: Function) {
        this.events[name] = fn
    }

    unsubscribe(name: string) {
        this.events[name] = null
    }

    emit(name: string, ...args: any) {
        if (this.events[name]) {
            this.events[name]?.(...args)
        }
    }
}

export const emitter = new EventEmitter()