
# 📦 MAPET Frontend – Changelog

## [1.1.0] - 2025-07-07

### Added
- Integration with backend API `/pet-reports` for dynamic report loading
- Default fallback image for broken or missing report images
- Image preview support using `/uploads/` folder served from backend
- New dropdowns in report creation form for:
  - Size (Mini, Pequeño, Mediano, Grande)
  - Color (Negro, Gris, Amarillo, Blanco, Café, Otro)

### Changed
- Removed static dummy_data/Reports
- Updated internal `Report` interface to match backend response
- Improved mapping logic for optional fields and type renaming

### Fixed
- Bug where map pins showed but image preview failed due to incorrect path
- Errors caused by missing fields in dynamic report mapping
