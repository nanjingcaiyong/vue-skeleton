const LETTER_ELEMENTS = ['p','span', 'img', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'label', 'strong', 'del', 'a', 'button', 'li'] // 文案标签

const CLASS_NAME = 'skeleton-loading'
const ATTRIBUTE_NAME = 'origin-attrs'

const saveOriginAttrs = (dom) => {
  const { display, width } = dom.style
  dom.setAttribute(ATTRIBUTE_NAME, JSON.stringify({display, width}))
  return {
    display: 'inline-block',
    width: '100%'
  }
}

const applyOriginAttrs = (dom) => {
  const originAttrs = JSON.parse(dom.getAttribute(ATTRIBUTE_NAME) || '{}')
  dom.removeAttribute(ATTRIBUTE_NAME)
  return originAttrs
}

const isLetterElm = (tagName) => LETTER_ELEMENTS.includes(tagName.toLowerCase())

const skeletonCSS = `.skeleton-loading {
  position: relative;
}

.skeleton-loading::after {
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: '#fff';
  content: ' ';
}

.skeleton-loading::before {
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(190, 190, 190, 0.2) 25%, rgba(129, 129, 129, 0.24) 37%, rgba(190, 190, 190, 0.2) 100%);
  background-size: 400% 100%;
  background-color: #fff;
  animation: ant-skeleton-loading 1.4s ease infinite;
  content: ' ';
}

@keyframes ant-skeleton-loading {
  0% { background-position: 100% 50%; }
  to { background-position: 0 50%; }
}
`
const appendSkeletonStyle = () => {
  const styleElm = document.createElement('style')
  styleElm.textContent = skeletonCSS
  document.head.appendChild(styleElm)
}

const defineDirective = (app) => {
  app.directive('skeleton', {
    mounted (el, blings) {
      const { value: selector } = blings
      appendSkeletonStyle()
      el = selector ? el.querySelector(selector) : el
      const computedStyles = window.getComputedStyle(el) || {}
      if (isLetterElm(el.tagName)) {
        const newAttrs = saveOriginAttrs(el)
        Object.assign(el.style, newAttrs)
        const lineHeight = Number(computedStyles.lineHeight?.replace('px', ''))
        const fontSize = Number(computedStyles.fontSize?.replace('px', ''))
        const height = Number(computedStyles.height?.replace('px', ''))
        el.style.height = Math.max(fontSize, lineHeight, height) + 'px'
      }
      el.dataset.skeleton || el.classList.add(CLASS_NAME)
    },
    updated (el,blings) {
      const { value: selector } = blings
      el = selector ? el.querySelector(selector) : el
      const originAttrs = applyOriginAttrs(el)
      Object.assign(el.style, originAttrs)
      el.dataset.skeleton && el.classList.remove(CLASS_NAME)
    },
  })
} 

export default {
  install (app) {
    defineDirective(app)
  }
}