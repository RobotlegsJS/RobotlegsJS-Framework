import { GenericEvent } from "../../../../../src/org/osflash/signals/events/GenericEvent";
import { IEvent } from "../../../../../src/org/osflash/signals/events/IEvent";

export class MessageEvent extends GenericEvent implements IEvent {
    public message: string;

    constructor(message: string) {
        super();
        this.message = message;
    }

    /*override*/
    public clone(): IEvent {
        return new MessageEvent(this.message);
    }
}
