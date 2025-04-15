# THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
# THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

from odoo.addons.nuidoai.tools.function_tool import get_function

from .plugins import sales_plugin

def create_semantic_kernel_object(environment, create_function_registry, definition):
    create_function = get_function(create_function_registry, definition["type"])
    if create_function:
        return create_function(environment, create_function_registry, definition)
    else:
        raise f"Create function not found for {definition["type"]}"

def create_sales_plugin(environment, create_function_registry, definition):
    return sales_plugin.SalesPlugin(environment)

