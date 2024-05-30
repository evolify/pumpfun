import { useSyncExternalStore, useMemo } from "react"

export default class Store<S>{
  private _state: S
  private _listeners: Array<(data: S) => void>

  private _getState = () => this._state

  private _emit = (data: S) => {
    for (let listener of this._listeners) {
      listener(data)
    }
  }

  get state(){
    return this._state
  }

  constructor(initialState: S){
    this._state = initialState
    this._listeners = []
    this.subscribe = this.subscribe.bind(this)
    this.update = this.update.bind(this)
    this.use = this.use.bind(this)
  }

  subscribe(listener: (data: S) => void){
    this._listeners = [...this._listeners, listener]
    return () => {
      this._listeners = this._listeners.filter(l => l !== listener)
    }
  }

  update(data: Partial<S>): S
  update(updater: (state: S) => Partial<S>): S
  update(payload: Partial<S> | ((state: S) => Partial<S>)) {
    let data: Partial<S>
    if (typeof payload === "function") {
      data = payload(this._state)
    } else {
      data = payload
    }
    this._state = {
      ...this._state,
      ...data,
    }
    this._emit(this._state)
    return this._state
  }


  use(): S
  use<T>(compute: (state: S) => T): T
  use<T>(compute?: (state: S) => T): S | T {
    const state = useSyncExternalStore(this.subscribe, this._getState, () => this._state) as S
    if(!compute){
      return state
    }
    return useMemo(() => compute(state), [state])
  }
}
