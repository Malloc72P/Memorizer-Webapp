export class DaseDocumentEvent {
  action:DaseDocumentEventEnum;
  data;

  constructor(action: DaseDocumentEventEnum, data) {
    this.action = action;
    this.data = data;
  }
}
export enum DaseDocumentEventEnum{
  CREATE,
  UPDATE,
  DELETE,
  ACTIVATE_SELECT_MODE,
  DEACTIVATE_SELECT_MODE,
  ON_DEBUG_REQUEST,
}
