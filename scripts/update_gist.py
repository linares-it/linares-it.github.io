import requests
import json
import os
from datetime import datetime, timezone

TOKEN = os.environ["GIST_TOKEN"]
USERNAME = os.environ["GH_USERNAME"]
GIST_ID = os.environ["GIST_ID"]
HEADERS = {"Authorization": f"token {TOKEN}", "Accept": "application/vnd.github+json"}
NOW = datetime.now(timezone.utc)


def truncate(text, max_chars=60):
    if len(text) <= max_chars:
        return text
    return text[:max_chars].rsplit(" ", 1)[0] + "…"


def calc_health(days_since, open_issues):
    if days_since == 999:
        return "red"
    if days_since <= 30 and open_issues < 5:
        return "green"
    elif days_since <= 90 or open_issues <= 15:
        return "yellow"
    else:
        return "red"


def calc_status(days_since):
    if days_since <= 7:
        return "active"
    elif days_since <= 60:
        return "review"
    elif days_since <= 180:
        return "planned"
    else:
        return "closed"


def calc_progress(days_since, open_issues):
    """Progreso basado en actividad reciente, no en issues/stars."""
    if open_issues > 20:
        return 10
    if days_since <= 7:
        return 100
    if days_since <= 30:
        return 80
    if days_since <= 90:
        return 60
    if days_since <= 180:
        return 40
    if days_since <= 365:
        return 20
    return 10


def calc_kpis(projects):
    total = len(projects)
    avg_prog = int(sum(p["progress"] for p in projects) / total) if total else 0
    active_alerts = sum(1 for p in projects if p["health"] == "red")
    return {
        "totalProjects": total,
        "avgProgress": avg_prog,
        "budgetUsedPct": 0,  # TODO: sin origen de datos real en GitHub API
        "activeAlerts": active_alerts,
    }


def calc_alerts(projects):
    """Genera alertas escaladas por días sin actividad."""
    alerts = []
    for p in projects:
        if p["health"] == "red" or p["daysSincePush"] > 90:
            if p["daysSincePush"] > 365:
                severity = "high"
            elif p["daysSincePush"] > 90:
                severity = "medium"
            else:
                severity = "low"
            alerts.append(
                {
                    "severity": severity,
                    "message": f"Repo '{p['repoName']}' lleva {p['daysSincePush']} días sin push.",
                    "timestamp": NOW.strftime("%Y-%m-%dT%H:%M:%SZ"),
                }
            )

    return (
        alerts
        if alerts
        else [
            {
                "severity": "low",
                "message": "Sin alertas activas.",
                "timestamp": NOW.strftime("%Y-%m-%dT%H:%M:%SZ"),
            }
        ]
    )


# ── Fetch repos ───────────────────────────────────────────────────────────────
repos_raw = requests.get(
    f"https://api.github.com/users/{USERNAME}/repos?per_page=100&sort=updated",
    headers=HEADERS,
).json()

projects = []
for repo in repos_raw:
    name = repo["name"]
    description = repo.get("description") or name
    stars = repo["stargazers_count"]
    open_issues = repo["open_issues_count"]
    pushed_at = repo.get("pushed_at")
    repo_id = repo["id"]

    if pushed_at:
        last_push = datetime.fromisoformat(pushed_at.replace("Z", "+00:00"))
        days_since = (NOW - last_push).days
    else:
        days_since = 999

    projects.append(
        {
            "id": f"PRJ-{str(repo_id)[-3:]}",
            "title": truncate(description, 60),
            "titleFull": description,
            "repoName": name,
            "repoUrl": repo["html_url"],
            "health": calc_health(days_since, open_issues),
            "status": calc_status(days_since),
            "progress": calc_progress(days_since, open_issues),
            "stars": stars,
            "openIssues": open_issues,
            "daysSincePush": days_since,
            "language": repo.get("language") or "—",
            "owner": repo["owner"]["login"],
            "spent": 0,  # TODO: sin origen real — reemplazar con fuente externa
            "budget": 0,
        }
    )

kpis = calc_kpis(projects)
alerts = calc_alerts(projects)

payload = {
    "lastUpdated": NOW.strftime("%Y-%m-%dT%H:%M:%SZ"),
    "username": USERNAME,
    "totalRepos": len(projects),
    "kpis": kpis,
    "alerts": alerts,
    "projects": projects,
}

# ── Push al Gist ──────────────────────────────────────────────────────────────
response = requests.patch(
    f"https://api.github.com/gists/{GIST_ID}",
    headers=HEADERS,
    json={"files": {"health-data.json": {"content": json.dumps(payload, indent=2)}}},
)

if response.status_code == 200:
    print(
        f"✅ Gist actualizado — {len(projects)} repos | alertas activas: {kpis['activeAlerts']}"
    )
else:
    print(f"❌ Error {response.status_code}: {response.text}")
    exit(1)
