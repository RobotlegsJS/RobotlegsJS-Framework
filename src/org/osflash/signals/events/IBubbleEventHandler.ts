import { IEvent } from "./IEvent";

export interface IBubbleEventHandler {
    /**
     * Handler for event bubbling.
     * It's left to the IBubbleEventHandler to decide what to do with the event.
     * @param    event The event that bubbled up.
     * @return whether to continue bubbling this event
     */
    onEventBubbled(event: IEvent): boolean;
}
