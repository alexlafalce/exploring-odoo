import { makeReactive } from "@nuido/utils/utils";
export class JointModel {
    id;
    vprops;
    startPathId;
    endPathId;
    constructor(id, cX, cY, r, startPathId, endPathId) {
        this.id = id;
        const vprops = {
            cX: cX,
            cY: cY,
            r: r,
        };
        this.vprops = makeReactive(this, vprops);
        this.startPathId = startPathId;
        this.endPathId = endPathId;
    }
}
