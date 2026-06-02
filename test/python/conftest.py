import pytest
from datetime import datetime, timezone, timedelta

# ── helpers extraídos del script principal ──────────────────────────────────


def truncate(text, max_chars=60):
    if len(text) <= max_chars:
        return text
    return text[:max_chars].rsplit(" ", 1)[0] + "…"


def calc_health(days_since: int, open_issues: int) -> str:
    if days_since == 999:  # sin pushed_at — repo sin actividad registrada
        return "red"
    if days_since <= 30 and open_issues < 5:
        return "green"
    elif days_since <= 90 or open_issues <= 15:
        return "yellow"
    else:
        return "red"


def calc_status(days_since: int) -> str:
    if days_since <= 7:
        return "active"
    elif days_since <= 60:
        return "maintenance"
    else:
        return "inactive"


def calc_progress(open_issues: int, stars: int) -> int:
    total = max(open_issues + stars, 1)
    return max(0, min(100, 100 - int((open_issues / total) * 100)))


def build_project(repo: dict, index: int, now: datetime) -> dict:
    pushed_at = repo.get("pushed_at")
    if pushed_at:
        last_push = datetime.fromisoformat(pushed_at.replace("Z", "+00:00"))
        days_since = (now - last_push).days
    else:
        days_since = 999

    open_issues = repo["open_issues_count"]
    stars = repo["stargazers_count"]

    return {
        "id": f"REPO-{index:03d}",
        "title": truncate(repo.get("description") or repo["name"], 60),
        "titleFull": repo.get("description") or repo["name"],
        "repoName": repo["name"],
        "repoUrl": repo["html_url"],
        "health": calc_health(days_since, open_issues),
        "status": calc_status(days_since),
        "progress": calc_progress(open_issues, stars),
        "stars": stars,
        "openIssues": open_issues,
        "daysSincePush": days_since,
        "language": repo.get("language") or "—",
        "owner": repo["owner"]["login"],
    }


# ── fixtures ─────────────────────────────────────────────────────────────────


@pytest.fixture
def now():
    return datetime(2026, 5, 31, 11, 0, 0, tzinfo=timezone.utc)


@pytest.fixture
def repo_active(now):
    """Repo con push hace 4 días y 1 issue abierta → health green."""
    pushed = (now - timedelta(days=4)).strftime("%Y-%m-%dT%H:%M:%SZ")
    return {
        "name": "demo-laboratorio-rag-langchain",
        "description": "Sistema RAG local con LangChain para entornos restringidos",
        "html_url": "https://github.com/linares-it/demo-laboratorio-rag-langchain",
        "stargazers_count": 3,
        "open_issues_count": 1,
        "pushed_at": pushed,
        "language": "Python",
        "owner": {"login": "linares-it"},
    }


@pytest.fixture
def repo_stale(now):
    """Repo con push hace 120 días y 20 issues → health red."""
    pushed = (now - timedelta(days=120)).strftime("%Y-%m-%dT%H:%M:%SZ")
    return {
        "name": "old-project",
        "description": "Proyecto abandonado",
        "html_url": "https://github.com/linares-it/old-project",
        "stargazers_count": 0,
        "open_issues_count": 20,
        "pushed_at": pushed,
        "language": "JavaScript",
        "owner": {"login": "linares-it"},
    }


@pytest.fixture
def repo_warning(now):
    """Repo con push hace 45 días y 8 issues → health yellow."""
    pushed = (now - timedelta(days=45)).strftime("%Y-%m-%dT%H:%M:%SZ")
    return {
        "name": "auditoria-identidad-biometrica",
        "description": (
            "Auditoría masiva de identidad mediante Deep Learning "
            "(Facenet512/RetinaFace). Compara avatares de IA contra fotos reales "
            "para validar la preservación de rasgos faciales y estructura biométrica."
        ),
        "html_url": "https://github.com/linares-it/auditoria-identidad-biometrica",
        "stargazers_count": 5,
        "open_issues_count": 8,
        "pushed_at": pushed,
        "language": "Python",
        "owner": {"login": "linares-it"},
    }


@pytest.fixture
def repo_no_description(now):
    """Repo sin descripción → usa el nombre como fallback."""
    pushed = (now - timedelta(days=2)).strftime("%Y-%m-%dT%H:%M:%SZ")
    return {
        "name": "my-repo",
        "description": None,
        "html_url": "https://github.com/linares-it/my-repo",
        "stargazers_count": 0,
        "open_issues_count": 0,
        "pushed_at": pushed,
        "language": None,
        "owner": {"login": "linares-it"},
    }
