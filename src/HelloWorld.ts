export class HelloWorld {
    private _text: string;
    constructor() {
        this._text = "hello world";
    }
    public get text(): string {
        return this._text;
    }
}
