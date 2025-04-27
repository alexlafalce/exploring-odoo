# THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
# 
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
# DO NOT USE IT IN PRODUCTION.

import logging

_logger = logging.getLogger(__name__)

from .base_node import BaseNode

from odoo.tools import safe_eval

class ConditionalNode(BaseNode):
    def process(self, params):
        context = {
            'datetime': safe_eval.datetime,
            'dateutil': safe_eval.dateutil,
            'time': safe_eval.time,
            'uid': self.env.uid,
            'user': self.env.user,
        }
        if params is not None:
            context['params'] = params

        res = safe_eval.safe_eval(self.definition["condition"], context)
        if res != True:
            res = False

        if "next_nodes" in self.definition and len(self.definition["next_nodes"]) > 0:
            true_node = next((o for o in self.definition["next_nodes"] if o["spec"]["condition"] == 'True'), None)
            false_node = next((o for o in self.definition["next_nodes"] if o["spec"]["condition"] == 'False'), None)

            self.next_node_info = true_node if res else false_node
        else:
            self.next_node_info = None

        return params
