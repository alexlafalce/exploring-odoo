// THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
// THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
// THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

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
