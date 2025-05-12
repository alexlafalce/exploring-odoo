# THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
# 
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
# DO NOT USE IT IN PRODUCTION.

import logging

_logger = logging.getLogger(__name__)

from odoo.addons.nuido_flow.flows.core.base_node import BaseNode

class RecordMapNode(BaseNode):
    def process(self, params):
        super().process(params)
        data = self.definition["record_map"]

        return {
                self.definition["key"]: data
            }
