# import pytest
from conftest import calc_health, calc_status, calc_progress, build_project


class TestCalcHealth:
    def test_green_when_recent_push_and_few_issues(self):
        assert calc_health(days_since=4, open_issues=1) == "green"

    def test_green_boundary_30_days(self):
        assert calc_health(days_since=30, open_issues=4) == "green"

    def test_yellow_when_push_over_30_days(self):
        assert calc_health(days_since=45, open_issues=2) == "yellow"

    def test_yellow_when_issues_between_5_and_15(self):
        assert calc_health(days_since=10, open_issues=10) == "yellow"

    def test_yellow_boundary_90_days(self):
        assert calc_health(days_since=90, open_issues=20) == "yellow"

    def test_red_when_stale_and_many_issues(self):
        assert calc_health(days_since=120, open_issues=20) == "red"

    def test_red_boundary_over_90_days_and_over_15_issues(self):
        assert calc_health(days_since=91, open_issues=16) == "red"

    def test_green_requires_both_conditions(self):
        # push reciente pero muchas issues → no es green
        assert calc_health(days_since=5, open_issues=5) != "green"


class TestCalcStatus:
    def test_active_within_7_days(self):
        assert calc_status(7) == "active"

    def test_maintenance_between_8_and_60(self):
        assert calc_status(30) == "maintenance"
        assert calc_status(60) == "maintenance"

    def test_inactive_over_60_days(self):
        assert calc_status(61) == "inactive"
        assert calc_status(999) == "inactive"


class TestCalcProgress:
    def test_full_progress_no_issues(self):
        assert calc_progress(open_issues=0, stars=10) == 100

    def test_zero_progress_all_issues(self):
        # 10 issues, 0 stars → total=10, progress = 100 - 100% = 0
        assert calc_progress(open_issues=10, stars=0) == 0

    def test_progress_clamped_between_0_and_100(self):
        result = calc_progress(open_issues=50, stars=0)
        assert 0 <= result <= 100

    def test_progress_with_mixed_values(self):
        # 2 issues, 8 stars → total=10, open ratio=20% → progress=80
        assert calc_progress(open_issues=2, stars=8) == 80


class TestBuildProject:
    def test_green_repo(self, repo_active, now):
        p = build_project(repo_active, 1, now)
        assert p["health"] == "green"
        assert p["status"] == "active"
        assert p["id"] == "REPO-001"
        assert p["language"] == "Python"

    def test_red_repo(self, repo_stale, now):
        p = build_project(repo_stale, 2, now)
        assert p["health"] == "red"
        assert p["status"] == "inactive"

    def test_yellow_repo(self, repo_warning, now):
        p = build_project(repo_warning, 3, now)
        assert p["health"] == "yellow"
        assert p["status"] == "maintenance"

    def test_no_description_falls_back_to_name(self, repo_no_description, now):
        p = build_project(repo_no_description, 4, now)
        assert p["title"] == "my-repo"
        assert p["titleFull"] == "my-repo"

    def test_no_language_returns_dash(self, repo_no_description, now):
        p = build_project(repo_no_description, 4, now)
        assert p["language"] == "—"

    def test_days_since_push_is_calculated(self, repo_active, now):
        p = build_project(repo_active, 1, now)
        assert p["daysSincePush"] == 4

    def test_missing_pushed_at_returns_999(self, repo_active, now):
        repo_active["pushed_at"] = None
        p = build_project(repo_active, 1, now)
        assert p["daysSincePush"] == 999
        assert p["health"] == "red"
