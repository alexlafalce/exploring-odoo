# THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
# 
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
# DO NOT USE IT IN PRODUCTION.

import logging

_logger = logging.getLogger(__name__)
import ast

from odoo import fields as fds
from odoo.tools import date_utils as dtu

from odoo.addons.nuido_flow.flows.core.base_node import BaseNode

class DataNode(BaseNode):
    def process(self, params):
        super().process(params)

        additional_domain = []
        if ("domain" in params):
            additional_domain = params["domain"]

        domain = ast.literal_eval(self.definition["domain"])
        domain = domain + additional_domain

        field_infos = self.definition["fields"]
        fields = [o["technical"] for o in field_infos]

        dynamic_date_field = self.definition["dynamic_date_field"]
        dynamic_date_interval = self.definition["dynamic_date_interval"]

        if dynamic_date_field != "" and dynamic_date_interval != "":
            now = fds.Datetime.today()
            dynamic_domain = [(dynamic_date_field, ">=" , dtu.start_of(now, dynamic_date_interval)),
                            (dynamic_date_field, "<=", dtu.end_of(now, dynamic_date_interval))]

            domain = domain + dynamic_domain

        data = self.env[self.definition["model"]].search_read(domain, fields)

        return {
                self.definition["key"]: data
            }
