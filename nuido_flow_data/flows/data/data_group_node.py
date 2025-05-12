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
import pandas as pd

from odoo import fields as fds, models
from odoo.tools import date_utils as dtu, DEFAULT_SERVER_DATE_FORMAT

from odoo.addons.nuido_flow.flows.core.base_node import BaseNode

class DataGroupNode(BaseNode):
    def process(self, params):
        super().process(params)

        domain = []
        if ("domain" in params):
            domain = params["domain"]

        data = self._query_data(domain)

        return {
                self.definition["key"]: data
            }


    def _query_data(self, additional_domain):
        model_name = self.definition["model"]
        model = self.env[model_name]

        node_def = self.definition

        field_infos = node_def["fields"]

        domain = ast.literal_eval(self.definition["domain"])
        domain = domain + additional_domain

        dynamic_date_field = self.definition["dynamic_date_field"]
        dynamic_date_interval = self.definition["dynamic_date_interval"]

        if dynamic_date_field != "" and dynamic_date_interval != "":
            now = fds.Datetime.today()
            dynamic_domain = [(dynamic_date_field, ">=" , dtu.start_of(now, dynamic_date_interval)),
                            (dynamic_date_field, "<=", dtu.end_of(now, dynamic_date_interval))]

            domain = domain + dynamic_domain

        datetime_granularity = node_def["datetime_granularity"]

        group_field_name = node_def["group_field"]
        group_field_meta = self.env["ir.model.fields"]._get(model_name, group_field_name)

        aggr_funcs = []
        orders = []
        value_field_metas = []

        group_by = group_field_name
        if group_field_meta.ttype in ["date", "datetime"]:
            group_by = f"{group_by}:{datetime_granularity}"

        for field_info in field_infos:
            value_field_name = field_info["technical"]
            value_field_meta = self.env["ir.model.fields"]._get(model_name, value_field_name)
            value_field_metas.append(value_field_meta)

            aggr_func = f"{value_field_name}:{node_def["aggregate_function"]}"
            aggr_funcs.append(aggr_func)

            orders.append(f"{aggr_func} asc")

        order = f"{group_by} desc"
        order = order + "," + ",".join(orders)

        aggs = model.sudo()._read_group(
            domain=domain,
            groupby=[group_by],
            aggregates=aggr_funcs,
            order=order
        )

        group_field_display_name = group_field_meta.field_description
        value_field_display_names = [o.field_description for o in value_field_metas]
        df = pd.DataFrame(aggs,
                        columns=[
                            group_field_display_name,
                            *value_field_display_names
                        ]
                    )

        df = df.map(lambda o: o.name if isinstance(o, models.Model) else o)
        res = df

        output_type = self.definition["output_type"]

        if output_type == "array":
            res = df.to_dict("records")
        elif output_type == "html":
            res = res.to_html()

        return res