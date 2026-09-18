+++
title = "Theme reference"
description = "Every element the theme styles, on one page. Safe to delete once you've had a look."
date = 2026-09-17

[taxonomies]
tags = ["meta", "reference"]
authors = ["Brett Hamilton"]
+++

A scratch page exercising every block the stylesheets cover, so regressions are
obvious. Delete it whenever you like.

## Headings

Headings run from `h1` to `h6`; hover one and a `#` anchor appears to its right.

### Third level

#### Fourth level

##### Fifth level

## Inline elements

Body copy sits at `--step-0` with **bold**, *italic*, `inline code`,
~~strikethrough~~, a [link to Zola](https://www.getzola.org), and a footnote[^1].
Press <kbd>Ctrl</kbd> + <kbd>K</kbd> to see the keycap style.

[^1]: Footnotes collect at the bottom, above the footer.

## Lists

- An unordered item
- Another, with nesting:
  - Nested one
  - Nested two
- A third

1. Ordered items
2. Count as you'd expect
3. Down to here

## Callouts

The five GitHub alert types map onto erudite's callout styling:

> [!NOTE]
> Useful information a reader should notice even when skimming.

> [!TIP]
> Optional advice for doing something better.

> [!IMPORTANT]
> Something essential for the task to succeed.

> [!WARNING]
> Urgent information needing immediate attention.

> [!CAUTION]
> Advice about the risks or negative outcomes of an action.

For a custom title or a foldable callout, drop in the HTML directly:

<details data-callout="tip" data-foldable>
  <summary>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><defs><mask id="cl-bulb"><g fill="none" fill-rule="evenodd" clip-rule="evenodd"><path fill="#fff" d="M11.5 2C7.358 2 4 5.436 4 9.674c0 2.273.966 4.315 2.499 5.72c.51.467.889.814 1.157 1.066a15 15 0 0 1 .4.39l.033.036c.237.3.288.376.318.446s.053.16.112.54c.024.15.026.406.026 1.105v.03c0 .409 0 .762.026 1.051c.027.306.087.61.248.895c.18.319.438.583.75.767c.278.165.575.226.874.254c.283.026.628.026 1.028.026h.058c.4 0 .745 0 1.028-.026c.3-.028.595-.09.875-.254a2.07 2.07 0 0 0 .749-.767c.16-.285.22-.588.248-.895c.026-.29.026-.642.025-1.051v-.03c0-.699.003-.955.026-1.105c.06-.38.082-.47.113-.54c.03-.07.081-.147.318-.446l.003-.003l.005-.006l.025-.027l.088-.09q.112-.113.312-.3c.268-.252.647-.599 1.157-1.067A7.74 7.74 0 0 0 19 9.674C19 5.436 15.642 2 11.5 2m1.57 17.932q.011-.113.015-.258h-3.17q.004.145.014.258c.019.21.05.286.071.324a.7.7 0 0 0 .25.255c.037.022.111.054.316.073c.214.02.497.02.934.02s.72 0 .934-.02c.205-.019.279-.05.316-.073a.7.7 0 0 0 .25-.255c.021-.038.052-.114.07-.324"/><path fill="#000" d="M9.274 13.35a.75.75 0 0 1 1.025.274a1.25 1.25 0 0 0 2.166 0a.75.75 0 1 1 1.298.752a2.76 2.76 0 0 1-1.631 1.27V17a.75.75 0 0 1-1.5 0v-1.354A2.76 2.76 0 0 1 9 14.376a.75.75 0 0 1 .274-1.025"/></g></mask></defs><path fill="currentColor" d="M0 0h24v24H0z" mask="url(#cl-bulb)"/></svg>
    <span>Foldable<span> (click to expand)</span></span>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="m12.37 15.835l6.43-6.63C19.201 8.79 18.958 8 18.43 8H5.57c-.528 0-.771.79-.37 1.205l6.43 6.63c.213.22.527.22.74 0"/></svg>
  </summary>
  <p>Anything can go in here — this one is collapsed until you click it.</p>
</details>

## Quotes

> A blockquote is set in muted text with a rule down its leading edge.
>
> It can run to several paragraphs.

## Code

Fenced blocks get a filename tab, line numbers, and a copy button on hover:

```rust,name=src/main.rs
fn main() {
    let greeting = "Hello, world!";
    println!("{greeting}");
}
```

Shell sessions drop the line-number gutter, matching erudite:

```sh
zola serve --open
```

Individual lines can be marked with `hl_lines`:

```python,hl_lines=2
values = [1, 2, 3]
total = sum(values)
print(total)
```

## Tables

| Token                | Light     | Dark      |
| -------------------- | --------- | --------- |
| `--background`       | `#fcfcfc` | `#111111` |
| `--foreground`       | `#202020` | `#eeeeee` |
| `--muted-foreground` | `#646464` | `#b4b4b4` |
| `--border`           | `#d9d9d9` | `#3a3a3a` |

## Rules

Horizontal rules separate sections:

---

And that's everything.
