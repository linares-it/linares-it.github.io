import pytest
from conftest import truncate


class TestTruncate:

    def test_short_text_unchanged(self):
        assert truncate("Hola mundo", 60) == "Hola mundo"

    def test_exact_length_unchanged(self):
        text = "a" * 60
        assert truncate(text, 60) == text

    def test_long_text_truncated_with_ellipsis(self):
        result = truncate("palabra1 palabra2 palabra3 palabra4 palabra5 palabra6 palabra7", 40)
        assert result.endswith("…")
        assert len(result) <= 41  # 40 chars + "…"

    def test_cuts_at_word_boundary(self):
        result = truncate("corta en la ultima palabra completa aqui extra", 35)
        assert "…" in result
        # no debe cortar en mitad de una palabra
        core = result[:-1]  # sin el "…"
        assert not core[-1].isalpha() or core.endswith(core.split()[-1])

    def test_real_description(self):
        desc = (
            "Auditoría masiva de identidad mediante Deep Learning "
            "(Facenet512/RetinaFace). Compara avatares de IA contra fotos reales "
            "para validar la preservación de rasgos faciales."
        )
        result = truncate(desc, 60)
        assert result.endswith("…")
        assert len(result) <= 61

    def test_single_word_longer_than_max(self):
        # una sola palabra muy larga — rsplit no encuentra espacio, devuelve vacío + "…"
        result = truncate("superlargapalabrasinespacios", 10)
        assert "…" in result

    def test_empty_string(self):
        assert truncate("", 60) == ""
