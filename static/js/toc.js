// Table-of-contents scroll-spy, ported from astro-erudite's TableOfContents
// component. Highlights every heading whose section is currently on screen,
// keeps the active run centred in the list, and drives the mobile progress
// ring. Simplified: this blog has no subpost series, so there are no groups.

;(() => {
  const nav = document.querySelector('page-toc nav')
  if (!nav) return

  // ---- mobile progress ring ------------------------------------------------

  const ring = nav.querySelector('label svg')
  const mobile = matchMedia('(width < 64rem)')
  const progress = () => {
    if (!ring || !mobile.matches) return
    const max = document.documentElement.scrollHeight - innerHeight
    ring.style.setProperty('--progress', String(max > 0 ? Math.min(scrollY / max, 1) : 0))
  }
  addEventListener('scroll', progress, { passive: true })
  mobile.addEventListener('change', progress)
  progress()

  // ---- link -> heading -----------------------------------------------------

  const links = new Map()
  for (const a of nav.querySelectorAll("a[href^='#']")) {
    const id = decodeURIComponent(a.hash.slice(1))
    const target = document.getElementById(id)
    if (target) links.set(target, a)
  }

  const article = document.querySelector('main article')
  const list = nav.querySelector(':scope > ul')
  const title = nav.querySelector('toc-title')
  const currentLabel = nav.querySelector('toc-current')
  const toggle = nav.querySelector('input')
  const heading = document.querySelector('main article > header h1')
  if (!article || !list || links.size === 0) return

  const fallback = currentLabel?.textContent ?? ''

  const scrollPaddingTop =
    Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingBlockStart) || 0

  // ---- block -> owning heading --------------------------------------------
  // Every top-level block in the prose inherits the last heading above it, so
  // a visible paragraph lights up the heading it belongs to.

  const sectionOf = new Map()
  let current
  for (const prose of article.querySelectorAll('prose-content')) {
    for (const block of prose.children) {
      if (links.has(block)) current = block
      if (current) sectionOf.set(block, current)
    }
  }

  const visible = new Set()
  let prevActive = new Set()

  const center = () => {
    const run = [...list.querySelectorAll('a[data-active]')]
    const first = run[0]
    const last = run[run.length - 1]
    if (!first || !run.every((a) => a.checkVisibility?.() ?? true)) return
    const area = list.getBoundingClientRect()
    const runCenter =
      (first.getBoundingClientRect().top + last.getBoundingClientRect().bottom) / 2
    list.scrollTo({ top: list.scrollTop + runCenter - (area.top + area.height / 2) })
  }

  toggle?.addEventListener('change', () => {
    if (toggle.checked) center()
  })
  list.addEventListener('click', (event) => {
    if (toggle && event.target.closest?.('a')) toggle.checked = false
  })

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.target === heading) {
          title?.toggleAttribute('data-visible', !entry.isIntersecting)
        } else if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      }

      const activeTargets = new Set()
      for (const block of visible) {
        const target = sectionOf.get(block)
        if (target) activeTargets.add(target)
      }

      let firstActive
      for (const [target, link] of links) {
        const on = activeTargets.has(target)
        link.toggleAttribute('data-active', on)
        link.removeAttribute('aria-current')
        if (on) firstActive ??= link
      }
      firstActive?.setAttribute('aria-current', 'location')

      if (currentLabel) {
        const label = firstActive?.textContent?.trim() || fallback
        if (currentLabel.textContent !== label) currentLabel.textContent = label
      }

      let grew = false
      for (const target of activeTargets) {
        if (!prevActive.has(target)) {
          grew = true
          break
        }
      }
      prevActive = activeTargets
      if (grew) center()
    },
    { rootMargin: `-${scrollPaddingTop}px 0px 0px` },
  )

  for (const block of sectionOf.keys()) observer.observe(block)
  if (heading) observer.observe(heading)
  else title?.toggleAttribute('data-visible', true)
})()
