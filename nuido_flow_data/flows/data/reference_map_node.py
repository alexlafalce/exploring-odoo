# THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
# 
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
# DO NOT USE IT IN PRODUCTION.

from odoo.addons.nuido_flow.flows.core.base_node import BaseNode

class ReferenceMapNode(BaseNode):
    def process(self, params):
        super().process(params)

        reference_key = self.definition["reference_key"]
        reference = params[reference_key]

        model = self.definition["model"]
        field = self.definition["field"]
        domain = [(field, "=", reference)]

        record = self.env[model].search_read(domain, ["id"])
        if len(record) == 0:
            res = -1
        else:
            res = record[0]["id"]

        return {
            "id": res,
            "data": params
        }
