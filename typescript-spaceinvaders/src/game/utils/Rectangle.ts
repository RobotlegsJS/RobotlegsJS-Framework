export class Rectangle {

    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    public intersects(toIntersect: any): boolean {
        let resultx = Math.max(this.x, toIntersect.x);
        let resulty = Math.max(this.y, toIntersect.y);
        let resultwidth = Math.min(this.x + this.width, toIntersect.x + toIntersect.width) - resultx;
        let resultheight = Math.min(this.y + this.height, toIntersect.y + toIntersect.height) - resulty;
        if (resultwidth <= 0 || resultheight <= 0) {
            return false;
        }
        return true;
    }
}
