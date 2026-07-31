# Screenshot library

Reusable product screenshots for the website, product decks, articles, and video scripts.

## Structure

- Put shared kernel capabilities in their functional category (`data`, `ui`, `automation`, `governance`, `analytics`, or `integrations`), even when HotCRM supplied the demonstration data.
- Put application-specific narratives—customers, leads, quotes, campaigns, and other business context—in `hotcrm/`.
- Each logical screenshot owns one directory. Its locale variants and `meta.yaml` always live together.

```
screenshots/<category>/<screen-id>/
├── en.png
├── zh-Hans.png
└── meta.yaml
```

`meta.yaml` is the source of truth for title, alt text, purpose, capture parameters, and asset status. Re-capture both locale variants together when the UI or demo data changes.

## Current collection

The first HotCRM-backed collection covers five shared UI capabilities, one analytics view, and four CRM business narratives. See the category README files for the inventory and capture queues.
