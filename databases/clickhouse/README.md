# Analytics Storage Plan

- analytics_events (raw ingestion)
- daily_aggregates (rollups for dashboards)

Dashboard APIs should read rollups first and avoid scanning raw events for every request.
