import { registry } from "@web/core/registry";
import { Node } from "@nuido/components/node";
import { NodeSection } from "@nuido/components/node_section";
import { SectionedNodeModel } from "@nuido/models/sectioned_node";
import { NuidoNodeSectionRegistryName } from "@nuido/utils/registry";
export class SectionedNode extends Node {
    static template = "nuido.sectioned-node";
    static components = {
        ...Node.components,
        NodeSection
    };
    static props = {
        node: SectionedNodeModel
    };
    getSectionComponent(sectionType) {
        const res = registry.category(NuidoNodeSectionRegistryName).get(sectionType).component;
        return res;
    }
}
