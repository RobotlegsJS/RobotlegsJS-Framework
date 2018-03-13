import { IBubbleEventHandler } from "../../../../../src/org/osflash/signals/events/IBubbleEventHandler";
import { IEvent } from "../../../../../src/org/osflash/signals/events/IEvent";

export class BubbleHater implements IBubbleEventHandler {
    public onEventBubbled(event: IEvent): boolean {
        throw new Error("I SAID NO BUBBLES!!!");
    }
}
