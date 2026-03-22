interface SeedRandomFactory {
    (seed: string): () => number;
    new (seed: string): () => number;
}
interface Math {
    seedrandom: SeedRandomFactory;
}
interface Point {
    x: number;
    y: number;
}
interface Petal {
    leftP: Point;
    rightP: Point;
    mainP: Point;
    color: string;
    leftRad: number;
    rightRad: number;
    mainAngle: number;
    leftAngle: number;
    rightAngle: number;
    delta?: number;
}
declare class CircIdenticon {
    name: string;
    colors: string[];
    bgColors: string[];
    symmetrical: boolean;
    petals: Petal[];
    constructor(name: string);
    buildSVG(): string;
    getPoint(angle: number, r?: number): Point;
    selColor(rng: () => number, colors: string[]): string;
    drawItem(item: Petal): string;
    createIdenticon(): string;
}
declare const module: {
    exports?: unknown;
} | undefined;
