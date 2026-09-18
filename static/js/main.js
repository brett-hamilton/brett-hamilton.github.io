// Theme toggle, scroll-to-top, and code copy buttons.
// Ported from astro-erudite's ThemeToggle / ScrollToTop components.

// ---------------------------------------------------------------- theme ----

const toggleTheme = () => {
  const root = document.documentElement
  const dark =
    root.dataset.theme === 'dark' ||
    (!root.dataset.theme && matchMedia('(prefers-color-scheme: dark)').matches)
  const theme = dark ? 'light' : 'dark'
  root.dataset.theme = theme
  try {
    localStorage.theme = theme
  } catch {}
}

const themeButton = document.getElementById('theme-toggle')
if (themeButton) themeButton.onclick = toggleTheme

// -------------------------------------------------------- scroll to top ----

const scrollButtons = [...document.querySelectorAll('[data-scroll-top]')]

if (scrollButtons.length) {
  const update = () => {
    const past = scrollY > innerHeight * 0.5
    for (const button of scrollButtons) button.toggleAttribute('data-visible', past)
  }

  addEventListener('scroll', update, { passive: true })
  update()

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-scroll-top]')) window.scrollTo({ top: 0 })
  })
}

// ----------------------------------------------------------- copy code -----

const COPY_ICON =
  '<svg class="code-copy-idle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>' +
  '<svg class="code-copy-done" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m20 6-11 11-5-5"/></svg>'

for (const pre of document.querySelectorAll('prose-content pre')) {
  const frame = document.createElement('div')
  frame.className = 'code-block'
  pre.replaceWith(frame)
  frame.append(pre)

  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'code-copy'
  button.setAttribute('aria-label', 'Copy code')
  button.title = 'Copy code'
  button.innerHTML = COPY_ICON
  frame.append(button)

  let timer
  button.addEventListener('click', async () => {
    const code = pre.querySelector('code')
    try {
      await navigator.clipboard.writeText(code ? code.innerText : pre.innerText)
    } catch {
      return
    }
    button.setAttribute('data-copied', '')
    button.setAttribute('aria-label', 'Copied')
    clearTimeout(timer)
    timer = setTimeout(() => {
      button.removeAttribute('data-copied')
      button.setAttribute('aria-label', 'Copy code')
    }, 2000)
  })
}
