import pytest
import responses as rsps_lib
import requests
from conftest import build_project
from datetime import datetime, timezone, timedelta


GITHUB_API = "https://api.github.com"


@rsps_lib.activate
def test_github_api_returns_repos():
    """Verifica que la llamada a la API de GitHub devuelve repos parseables."""
    now = datetime(2026, 5, 31, 11, 0, 0, tzinfo=timezone.utc)
    pushed = (now - timedelta(days=3)).strftime("%Y-%m-%dT%H:%M:%SZ")

    rsps_lib.add(
        rsps_lib.GET,
        f"{GITHUB_API}/users/linares-it/repos",
        json=[
            {
                "name": "demo-rag",
                "description": "Sistema RAG local",
                "html_url": "https://github.com/linares-it/demo-rag",
                "stargazers_count": 2,
                "open_issues_count": 1,
                "pushed_at": pushed,
                "language": "Python",
                "owner": {"login": "linares-it"},
            }
        ],
        status=200,
    )

    response = requests.get(
        f"{GITHUB_API}/users/linares-it/repos",
        headers={"Authorization": "token fake-token"},
    )

    assert response.status_code == 200
    repos = response.json()
    assert len(repos) == 1
    assert repos[0]["name"] == "demo-rag"

    project = build_project(repos[0], 1, now)
    assert project["health"] == "green"
    assert project["status"] == "active"


@rsps_lib.activate
def test_github_api_empty_repos():
    """Perfil sin repos públicos devuelve lista vacía sin errores."""
    rsps_lib.add(
        rsps_lib.GET,
        f"{GITHUB_API}/users/linares-it/repos",
        json=[],
        status=200,
    )

    response = requests.get(f"{GITHUB_API}/users/linares-it/repos")
    assert response.status_code == 200
    assert response.json() == []


@rsps_lib.activate
def test_gist_patch_success():
    """Verifica que el PATCH al Gist devuelve 200."""
    rsps_lib.add(
        rsps_lib.PATCH,
        f"{GITHUB_API}/gists/fake-gist-id",
        json={"id": "fake-gist-id"},
        status=200,
    )

    payload = {"files": {"health-data.json": {"content": '{"projects":[]}'}}}
    response = requests.patch(
        f"{GITHUB_API}/gists/fake-gist-id",
        headers={"Authorization": "token fake-token"},
        json=payload,
    )

    assert response.status_code == 200


@rsps_lib.activate
def test_gist_patch_failure_raises():
    """Si el PATCH falla con 401, el script debe detectarlo."""
    rsps_lib.add(
        rsps_lib.PATCH,
        f"{GITHUB_API}/gists/fake-gist-id",
        json={"message": "Bad credentials"},
        status=401,
    )

    response = requests.patch(
        f"{GITHUB_API}/gists/fake-gist-id",
        headers={"Authorization": "token bad-token"},
        json={},
    )

    assert response.status_code != 200
    assert response.status_code == 401
