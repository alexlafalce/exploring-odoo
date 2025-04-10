# THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
# THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import warnings
warnings.filterwarnings("ignore", category=DeprecationWarning)

import logging
_logger = logging.getLogger(__name__)

import json

from semantic_kernel.contents.chat_history import ChatHistory

from .semantic_kernel import create_semantic_kernel_object
from ..models import nuidoai_registry_category as rcat

class ChitChat:
    def __init__(self, env, definition):
        self.env = env
        def_obj = json.loads(definition)

        create_function_registry = self.env["nuidoai.registry"].search_read([("category", "=", rcat.CREATE_FUNCTION)])

        if len(def_obj["chat_groups"]) > 0:
            chat_group_def = def_obj["chat_groups"][0]
            chat_group = create_semantic_kernel_object(self.env, create_function_registry, chat_group_def)
            self.chat = chat_group

            self.mode = "group"
        elif len(def_obj["agents"]) > 0:
            self.chat_history = ChatHistory()

            agent_def = def_obj["agents"][0]
            agent = create_semantic_kernel_object(self.env, create_function_registry, agent_def)
            self.chat = agent

            self.mode = "agent"
