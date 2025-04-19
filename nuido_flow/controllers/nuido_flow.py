# THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
# THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

from odoo import http
from odoo.http import request

class NuidoAiController(http.Controller):
    @http.route('/nuidoflow/run', type='json', auth='user', website=True)
    def run(self, def_id):
        env = request.env

        node_definition = env["nuido_flow.node.definition"].browse(def_id)
        node_definition._process_node_definitions()

        context = {
            'uid': env.user.id,
            'is_debug': env.user.has_group('base.group_no_one'),
            "active_node_definition_id": def_id,
        }
        node_definition.with_context(**context).run({})

        return True

    @http.route('/nuidoflow/process', type='json', auth='user', website=True)
    def process(self, def_id):
        env = request.env

        node_definition = env["nuido_flow.node.definition"].browse(def_id)
        node_definition._process_node_definitions()

        return True
