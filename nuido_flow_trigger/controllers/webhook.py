# THIS FILE IS A PART OF PUBLIC REPOSITORY https://github.com/yonitjio/exploring-odoo
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT
# 
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY.
# DO NOT USE IT IN PRODUCTION.
import logging

_logger = logging.getLogger(__name__)

from werkzeug.exceptions import Unauthorized
from odoo.http import request, route, Controller

# adapted from base_automation module
def get_webhook_request_payload():
    if not request:
        return None
    try:
        payload = request.get_json_data()
    except ValueError:
        _logger.warning("Exception on reading request data.", exc_info=True)
        payload = {**request.httprequest.args}
    return payload

class NuidoWebhookController(Controller):

    @route(['/nuido/webhook/<string:hook_id>'], type='http', auth='public', methods=['POST'], csrf=False, save_session=False)
    def nuido_webhook(self, hook_id, **kwargs):
        """ Execute an automation webhook """
        node_def = request.env['nuido_flow.node.definition'].sudo().search([('trigger_webhook_id', '=', hook_id)])
        if not node_def:
            return request.make_json_response({'status': 'error'}, status=404)

        data = get_webhook_request_payload()
        try:
            node_def.run(data)
        except Unauthorized:
            _logger.warning("Unauthorized access.", exc_info=True)
            return request.make_json_response({'status': 'error'}, status=401)
        except:
            _logger.warning("Exception running flow.", exc_info=True)
            return request.make_json_response({'status': 'error'}, status=500)
        return request.make_json_response({'status': 'ok'}, status=200)
