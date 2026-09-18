# myblog

A [Zola](https://www.getzola.org) blog themed after
[astro-erudite](https://github.com/jktrn/astro-erudite).

astro-erudite v2 is written in plain CSS with no framework, so almost all of it
ports over directly — `static/css/` keeps upstream's file split so changes can
be diffed against it later. Everything else is Zola's own built-ins: no theme
submodule, no Sass, no npm.

```sh
zola serve   # http://127.0.0.1:1111
zola build   # -> public/
```

## Layout

```
content/          _index.md is the home page; blog/ holds posts
templates/        base.html is the page shell; partials/ are the components
static/css/       ported stylesheets, one <link> each (see partials/head.html)
static/fonts/     IBM Plex Sans + Mono, vendored (no CDN)
static/icons/     SVGs, inlined at build time via load_data()
static/js/        main.js (theme, scroll-top, copy buttons), toc.js (scroll-spy)
```

## Writing a post

```toml
+++
title = "Post title"
description = "One line, shown in listings and meta tags."
date = 2026-09-18

[taxonomies]
tags = ["zola", "css"]
authors = ["Brett Hamilton"]

[extra]
image = "/img/banner.png"   # optional; used as the banner and OG image
+++
```

`description` is what shows under the title in listings, so it's worth filling
in. `authors` entries are matched by name against `[[extra.authors]]` in
`zola.toml` to pick up the avatar, bio, and social links.

### Callouts

Zola 0.23 renders GitHub alerts natively, and the CSS styles them as erudite
callouts:

```md
> [!NOTE]
> Five types: NOTE, TIP, IMPORTANT, WARNING, CAUTION.
```

Zola 0.23 removed shortcodes, so a callout with a custom title or a fold needs
raw HTML — `<details data-callout="tip" data-foldable>` with a `<summary>`.
See the "Theme reference" post for a copyable example.

### Code blocks

````md
```rust,name=src/main.rs   ← filename tab
```python,hl_lines=2       ← highlighted line
```sh                      ← shell langs drop the line-number gutter
````

Token colours come from Zola's `light_theme` / `dark_theme` with
`add_color_scheme = true`, which emits `light-dark()` values — so code follows
the theme toggle without a second stylesheet.

## Configuring

Everything site-specific lives in `[extra]` in `zola.toml`: `nav` (sidebar
links), `socials` (footer icons, `icon` naming a file in `static/icons/`), and
`[[extra.authors]]`. The home page's dictionary entry comes from
`[extra.dictionary]` in `content/_index.md`; drop that table and the home page
falls back to a plain heading plus prose.

`static/icons/logo.svg` and `static/favicon.svg` are astro-erudite's placeholder
mark — worth replacing with your own.

`content/blog/theme-reference.md` exists only to exercise every style; delete it
whenever you like.

## Attribution

See [THIRD-PARTY-LICENSES.md](THIRD-PARTY-LICENSES.md).
