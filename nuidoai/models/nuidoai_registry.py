# THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
# THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

# -*- coding: utf-8 -*-
import logging
_logger = logging.getLogger(__name__)

from odoo import models, fields

class NuidoAiRegistry(models.Model):
    _name = "nuidoai.registry"
    _description = "Nuido Ai Registry"
    _rec_name = "key"

    category = fields.Char("Category", required=True)
    key = fields.Char("Key", required=True)
    value = fields.Char("Value", required=True)

    _sql_constraints = [
        ('category_key_uniq', 'unique (category, key)', "Key already exists in category!"),
    ]
