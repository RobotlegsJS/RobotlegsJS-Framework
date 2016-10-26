export class Sprite {
}

export class MockEvent {
    constructor(public type: string) {
        this.type = type;
    }
}

export class MockMouseEvent extends MockEvent {
}
