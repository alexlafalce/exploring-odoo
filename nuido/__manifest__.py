# -*- coding: utf-8 -*-
{
    'name': "Node UI for Odoo",
    'summary': """Node UI for Odoo""",
    'description': """
        Node UI for Odoo
    """,
    'author': "Yoni Tjio",
    'category': 'Productivity',
    'version': '18.0.1.0.0',
    'depends': ['web', 'bus'],
    'assets': {
        "web.assets_backend":[
            "nuido/static/src/utils/**/*",
            "nuido/static/src/models/**/*",
            "nuido/static/src/components/**/*",
            "nuido/static/src/app/**/*",
        ],
    },
    "license":"Other proprietary",
    "application": False,
    "installable": True,
    "auto_install": False
}
