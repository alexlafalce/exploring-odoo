# THIS FILE IS A PART OF PUBLIC REPOSITORY: https://github.com/yonitjio/exploring-odoo
# THIS SOFTWARE IS RELEASED UNDER THE MIT LICENSE: https://opensource.org/licenses/MIT
# THIS SOFTWARE IS EXPERIMENTAL AND FOR EDUCATIONAL PURPOSE ONLY. DO NOT USE IT IN PRODUCTION.

import importlib

def get_function(registry, key):
    function_rec = next((x for x in registry if x["key"] == key), None)
    if function_rec:
        function_info = function_rec["value"].split(",")
        function_mod = function_info[0]
        function_name = function_info[1]

        module = importlib.import_module("odoo.addons." + function_mod)
        return getattr(module, function_name)
    else:
        return None
