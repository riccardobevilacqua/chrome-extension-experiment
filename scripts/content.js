function addReadingTimeBadge() {
  const article = document.querySelector('.devsite-article')

  // Remove existing badge if it exists
  const existingBadge = document.querySelector('.reading-time-badge')
  if (existingBadge) {
    existingBadge.remove()
  }

  if (article?.textContent) {
    const text = article.textContent
    const wordMatchRegExp = /[^\s]+/g // Regular expression
    const words = text.matchAll(wordMatchRegExp)
    const wordCount = [...words].length

    if (wordCount > 0) {
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
    }
  } else {
    console.error('Article element or its text content not found')
  }
}

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === 'pageLoaded' || request.message === 'routeChanged') {
    setTimeout(() => {
      addReadingTimeBadge();
    }, 100);
  }
});

addReadingTimeBadge();