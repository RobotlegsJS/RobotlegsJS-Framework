import { Event } from "@robotlegsjs/core";

export class AttackEvent extends Event {
    public static SUCCESS = "success";
    public static FAIL = "fail";

    constructor(type: string) {
        super(type);
    }
}
