function addReadingTimeBadge() {
  const article = document.querySelector('.devsite-article')

  // Remove existing badge if it exists
  const existingBadge = document.querySelector('.reading-time-badge')
  if (existingBadge) {
    existingBadge.remove()
  }

  // `document.querySelector` may return null if the selector doesn't match anything.
  if (article?.textContent) {
    const text = article.textContent
    const wordMatchRegExp = /[^\s]+/g // Regular expression
    const words = text.matchAll(wordMatchRegExp)
    // Use nullish coalescing to ensure we always have an iterable
    const wordCount = [...words].length
    const readingTime = Math.round(wordCount / 200)
    const badge = document.createElement('p')
    // Use the same styling as the publish information in an article's header
    badge.classList.add('color-secondary-text', 'type--caption', 'reading-time-badge')
    badge.textContent = `⏱️ ${readingTime} min read`

    // Support for API reference docs
    const heading = article.querySelector('h1')
    // Support for article docs with date
    const date = article.querySelector('time')?.parentNode

    const insertTarget = date ?? heading
    if (insertTarget) {
      insertTarget.insertAdjacentElement('afterend', badge)
    } else {
      console.error('Could not find a suitable element to insert the badge')
    }
  } else {
    console.error('Article element or its text content not found')
  }
}

function observePageChanges() {
  const targetNode = document.body
  const config = { childList: true, subtree: true }

  const callback = function(mutationsList, observer) {
    for(let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        const addedNodes = mutation.addedNodes
        for (let node of addedNodes) {
          if (node.nodeType === Node.ELEMENT_NODE && node.matches('.devsite-article')) {
            addReadingTimeBadge()
            return
          }
        }
      }
    }
  }

  const observer = new MutationObserver(callback)
  observer.observe(targetNode, config)
}

// Initial execution
addReadingTimeBadge()

// Set up the observer for future page changes
observePageChanges()
