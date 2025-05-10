# THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
# 
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
# DO NOT USE IT IN PRODUCTION.

import logging
import json

_logger = logging.getLogger(__name__)

from .base_node import BaseNode
from ..tools.mapper_tools import map_nested_dict

class MapperNode(BaseNode):
    def process(self, params):
        super().process(params)

        dict_map = self.definition["dict_map"]
        res = map_nested_dict(params, dict_map)
        res = res["maproot"]

        return res
