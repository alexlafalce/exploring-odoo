# THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
# THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import logging

_logger = logging.getLogger(__name__)

import json
from odoo.tools import json_default
from .base_node import BaseNode

class LogNode(BaseNode):
    def process(self, params):
        super().process(params)
        tag = self.definition["tag"]
        params_string = json.dumps(params, separators=(',', ':'), default=json_default)
        _logger.info("%s: %s", tag, json.dumps(params_string))
        return params