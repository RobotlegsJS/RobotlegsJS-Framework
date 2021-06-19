import { Event } from "@robotlegsjs/core";

export class AttackEvent extends Event {
    public static SUCCESS: string = "success";
    public static FAIL: string = "fail";

    public constructor(type: string) {
        super(type);
    }
}
