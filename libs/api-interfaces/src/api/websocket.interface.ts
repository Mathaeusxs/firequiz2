export enum WsAPIMessageEvent {

}

export interface WsAPIMessage<D = null | unknown> {
  event: WsAPIMessageEvent
  data: D
}
