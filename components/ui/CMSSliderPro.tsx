"use client"

/**
 * CMSSliderPro - Framer Component imported for Next.js / React
 */
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime"
import * as React from "react"
import { addPropertyControls, ControlType, RenderTarget, useIsStaticRenderer } from "framer"
import { motion, animate, useMotionValue } from "framer-motion"

// ============================================
// HELPERS
// ============================================
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n))
}

function findSliderItemContainer(container: HTMLElement, isVertical: boolean) {
  let bestElement: HTMLElement | null = null
  let bestCount = 0
  let bestSpread = -1

  const visit = (el: HTMLElement) => {
    const children = Array.from(el.children) as HTMLElement[]
    if (children.length >= 2) {
      const positions = children
        .map((child) => {
          const rect = child.getBoundingClientRect()
          return isVertical ? rect.top : rect.left
        })
        .filter(Number.isFinite)

      const spread = positions.length > 1 ? Math.max(...positions) - Math.min(...positions) : 0

      if (spread > bestSpread + 0.5 || (Math.abs(spread - bestSpread) <= 0.5 && children.length > bestCount)) {
        bestElement = el
        bestCount = children.length
        bestSpread = spread
      }
    }
    children.forEach(visit)
  }

  visit(container)
  return { element: bestElement, count: bestCount }
}

function getElementFrameInContainer(container: HTMLElement, target: HTMLElement | null) {
  if (!target) return null
  const containerRect = container.getBoundingClientRect()
  const targetRect = target.getBoundingClientRect()
  const width = target.offsetWidth || target.getBoundingClientRect().width
  if (width <= 0) return null

  let left = target.offsetLeft
  let parent = target.offsetParent as HTMLElement | null
  while (parent && parent !== container) {
    left += parent.offsetLeft
    parent = parent.offsetParent as HTMLElement | null
  }
  if (parent !== container) {
    left = targetRect.left - containerRect.left
  }

  let bottom = targetRect.bottom - containerRect.top
  target.querySelectorAll("*").forEach((child) => {
    const rect = child.getBoundingClientRect()
    if (rect.width <= 0 || rect.height <= 0) return
    if (rect.right < containerRect.left || rect.left > containerRect.right) return
    bottom = Math.max(bottom, rect.bottom - containerRect.top)
  })

  return {
    left: Math.max(0, Math.round(left * 100) / 100),
    width: Math.round(width * 100) / 100,
    bottom: Math.round(bottom * 100) / 100,
  }
}

function computeAlignmentStyle({ alignment, inset, offX, offY, splitSide }: any) {
  const style: React.CSSProperties = { position: "absolute", zIndex: 10 }
  const transforms: string[] = []

  if (splitSide) {
    if (splitSide === "prev") {
      style.left = `calc(${inset}px + ${offX}px)`
    } else {
      style.right = `calc(${inset}px + ${offX}px)`
    }
  } else if (alignment.includes("Left")) {
    style.left = inset + offX
  } else if (alignment.includes("Right")) {
    style.right = inset - offX
  } else {
    style.left = "50%"
    transforms.push(`translateX(calc(-50% + ${offX}px))`)
  }

  style.top = "50%"
  transforms.push(`translateY(calc(-50% + ${offY}px))`)

  if (transforms.length > 0) style.transform = transforms.join(" ")
  return style
}

// ============================================
// CONSTANTS
// ============================================
const DRAG_MOVE_THRESHOLD_PX = 6
const DRAG_VELOCITY_CLAMP = 2
const DRAG_PROJECTION_MULTIPLIER = 220
const CLICK_SUPPRESS_MS = 50
const DRAG_RESIST = 0.3
const WHEEL_STEP_THRESHOLD = 40
const WHEEL_COOLDOWN_MS = 250
const WHEEL_QUIET_MS = 140
const PROGRESS_BAR_HEIGHT = 4
const ACTIVE_DOT_SCALE = 1.3
const STAGGER_CAP = 12

// ============================================
// ICONS
// ============================================
const ChevronLeft = ({ size, color }: { size: number; color: string }) => (
  <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = ({ size, color }: { size: number; color: string }) => (
  <svg width={size * 0.45} height={size * 0.45} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

// ============================================
// MAIN COMPONENT & DEFAULTS
// ============================================
const DEFAULT_LAYOUT = { items: 3, gap: 30, padding: 0, fit: "Contain", align: "Stretch", aspectRatio: 0, bleed: "None" }
const DEFAULT_PLAYBACK = { interval: 3, pauseOnHover: true, loop: true, startAt: "Start" }
const DEFAULT_NAVIGATION = { step: "Single", draggable: true, keyboard: true }
const DEFAULT_ARROWS = {
  show: true,
  type: "Split",
  alignment: "Center Center",
  prevImage: "",
  nextImage: "",
  fill: "#ffffff",
  backdrop: "#000000",
  variant: "Fill",
  borderWidth: 1,
  borderColor: "#ffffff",
  size: 48,
  radius: 50,
  fadeIn: false,
  inset: 20,
  gap: 10,
  offsetX: 0,
  offsetY: 0,
  shadow: false,
  shadowColor: "rgba(0,0,0,0.2)",
  shadowBlur: 10,
}
const DEFAULT_DOTS = {
  type: "Dots",
  alignment: "Bottom Center",
  size: 10,
  inset: 20,
  gap: 8,
  padding: 10,
  fill: "rgba(255,255,255,0.4)",
  activeFill: "#ffffff",
  backdrop: "rgba(0,0,0,0.4)",
  radius: 20,
  opacity: 0.5,
  blur: 4,
  offsetX: 0,
  offsetY: 0,
  progressWidth: 200,
  compact: false,
  compactVisible: 3,
}
const DEFAULT_CENTER_FOCUS = { enabled: false, activeScale: 1.08, inactiveScale: 0.92, inactiveOpacity: 0.5, transitionSpeed: 0.35 }
const DEFAULT_APPEAR = { type: "Fade", mode: "Stagger", duration: 0.4, distance: 24, stagger: 0.06 }
const DEFAULT_ANIMATION = { type: "spring", stiffness: 240, damping: 28, mass: 1 }

export default function CMSSliderPro(props: any) {
  const { style, content, direction = "Left", autoPlay = false } = props

  const layout = { ...DEFAULT_LAYOUT, ...(props.layout || {}) }
  const playback = { ...DEFAULT_PLAYBACK, ...(props.playback || {}) }
  const navigation = { ...DEFAULT_NAVIGATION, ...(props.navigation || {}) }
  const arrows = { ...DEFAULT_ARROWS, ...(props.arrows || {}) }
  const dots = { ...DEFAULT_DOTS, ...(props.dots || {}) }
  const centerFocus = { ...DEFAULT_CENTER_FOCUS, ...(props.centerFocus || {}) }
  const appear = { ...DEFAULT_APPEAR, ...(props.appear || {}) }
  const animationOptions = props.animationOptions || DEFAULT_ANIMATION

  const { interval, pauseOnHover, loop, startAt } = playback
  const { align: itemAlign } = layout

  const shouldFillFrame = false
  const draggable = navigation.draggable
  const isCanvas = RenderTarget.current() === RenderTarget.canvas
  const isStatic = useIsStaticRenderer()
  const isFrozen = isCanvas || isStatic

  const containerRef = React.useRef<HTMLDivElement>(null)
  const reactId = React.useId()
  const instanceId = `cms-slider-${reactId.replace(/:/g, "-")}`

  const isVertical = direction === "Up" || direction === "Down"
  const isReversed = direction === "Right" || direction === "Down"

  const [itemCount, setItemCount] = React.useState(0)
  const [containerSize, setContainerSize] = React.useState(0)
  const [activeIndex, setActiveIndex] = React.useState(0)
  const [isHovered, setIsHovered] = React.useState(false)
  const [isFocused, setIsFocused] = React.useState(false)
  const [isDragging, setIsDragging] = React.useState(false)
  const [childrenFrame, setChildrenFrame] = React.useState<any>(null)
  const [childrenViewportHeight, setChildrenViewportHeight] = React.useState(0)
  const [isReady, setIsReady] = React.useState(isFrozen)

  const isActive = isHovered || isFocused
  const [reducedMotion, setReducedMotion] = React.useState(false)

  React.useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    React.startTransition(() => { setReducedMotion(mq.matches) })
    const handler = (e: MediaQueryListEvent) => {
      React.startTransition(() => { setReducedMotion(e.matches) })
      controlsRef.current?.stop()
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const itemsPerView = layout.items
  const maxIndex = React.useMemo(() => {
    if (navigation.step === "Page") {
      const totalPages = Math.ceil(itemCount / itemsPerView)
      return Math.max(0, totalPages - 1)
    }
    return Math.max(0, itemCount - itemsPerView)
  }, [itemCount, itemsPerView, navigation.step])

  const dotCount = maxIndex + 1
  const showNav = isCanvas ? itemCount > 0 || !!content : itemCount > itemsPerView
  const showArrowsNow = arrows.show && showNav && (!arrows.fadeIn || isActive || isCanvas)
  const safeActiveIndex = Math.min(activeIndex, maxIndex)

  const normalizedContent = React.useMemo(() => {
    if (!content) return null
    const childCount = React.Children.count(content)
    if (childCount > 1) {
      return (
        <div style={{ display: "flex", width: "100%", height: shouldFillFrame ? "100%" : "auto", gap: layout.gap, flexDirection: isVertical ? "column" : "row" }}>
          {React.Children.map(content, (child, i) => (
            <div role="group" aria-roledescription="Slide" aria-label={`Slide ${i + 1} of ${childCount}`}>
              {child}
            </div>
          ))}
        </div>
      )
    }
    return content
  }, [content, layout.gap, isVertical, shouldFillFrame])

  React.useEffect(() => {
    if (isCanvas) {
      React.startTransition(() => { setActiveIndex(0) })
    }
  }, [itemsPerView, isCanvas, direction])

  React.useEffect(() => {
    const container = containerRef.current
    if (!container) return
    if (typeof ResizeObserver === "undefined") return

    let rafId = 0
    let observedItemContainer: HTMLElement | null = null
    let ro: ResizeObserver

    const measure = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        if (!container) return
        const size = isVertical ? container.offsetHeight : container.offsetWidth
        if (size < 10) return

        const pad = layout.padding * 2
        const { element: itemContainer, count } = findSliderItemContainer(container, isVertical)

        if (itemContainer && itemContainer !== container) {
          if (itemContainer !== observedItemContainer) {
            if (observedItemContainer) ro.unobserve(observedItemContainer)
            ro.observe(itemContainer)
            observedItemContainer = itemContainer
          }
        } else if (observedItemContainer) {
          ro.unobserve(observedItemContainer)
          observedItemContainer = null
        }

        const nextChildrenFrame = getElementFrameInContainer(container, itemContainer)

        React.startTransition(() => {
          setContainerSize(size - pad)
          setChildrenFrame((prev: any) => {
            if (!nextChildrenFrame) return prev === null ? prev : null
            if (prev && Math.abs(prev.left - nextChildrenFrame.left) < 0.5 && Math.abs(prev.width - nextChildrenFrame.width) < 0.5 && Math.abs(prev.bottom - nextChildrenFrame.bottom) < 0.5) {
              return prev
            }
            return nextChildrenFrame
          })
          setChildrenViewportHeight(container.offsetHeight)
          if (isCanvas) {
            const preview = Math.max(itemsPerView + 2, 5)
            setItemCount(count > preview ? count : preview)
          } else if (count > 0) {
            setItemCount(count)
          }
          setIsReady(true)
        })
      })
    }

    ro = new ResizeObserver(measure)
    ro.observe(container)

    let mo: MutationObserver | null = null
    if (typeof MutationObserver !== "undefined") {
      mo = new MutationObserver(measure)
      mo.observe(container, { childList: true, subtree: true })
    }

    measure()

    return () => {
      ro.disconnect()
      mo?.disconnect()
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [layout.padding, isCanvas, itemsPerView, isVertical, content])

  const totalGaps = (itemsPerView - 1) * layout.gap
  const itemSize = containerSize > 0 ? (containerSize - totalGaps) / Math.max(1, itemsPerView) : 0
  const slideSize = containerSize > 0 ? itemSize + layout.gap : 0

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const controlsRef = React.useRef<any>(null)

  const setTranslate = React.useCallback((v: number) => {
    if (isVertical) y.set(v)
    else x.set(v)
  }, [isVertical, x, y])

  React.useEffect(() => {
    controlsRef.current?.stop()
    if (isVertical) x.set(0)
    else y.set(0)
  }, [isVertical, x, y])

  const animateTo = React.useCallback((v: number) => {
    if (isCanvas) return
    const mv = isVertical ? y : x
    controlsRef.current?.stop()
    controlsRef.current = animate(mv, v, reducedMotion ? { duration: 0 } : animationOptions || { duration: 0.45 })
  }, [animationOptions, isCanvas, isVertical, x, y, reducedMotion])

  const calcTargetTranslate = React.useCallback((index: number) => {
    const sign = isReversed ? 1 : -1
    if (navigation.step === "Page") return sign * index * itemsPerView * slideSize
    return sign * index * slideSize
  }, [navigation.step, itemsPerView, slideSize, isReversed])

  const goTo = React.useCallback((index: number, animateIt = true) => {
    let newIndex = index
    if (loop) {
      if (index < 0) newIndex = maxIndex
      else if (index > maxIndex) newIndex = 0
    } else {
      newIndex = clamp(index, 0, maxIndex)
    }
    React.startTransition(() => { setActiveIndex(newIndex) })
    const target = calcTargetTranslate(newIndex)
    if (animateIt) animateTo(target)
    else setTranslate(target)
  }, [loop, maxIndex, calcTargetTranslate, animateTo, setTranslate])

  const goPrev = React.useCallback(() => goTo(activeIndex - 1, true), [goTo, activeIndex])
  const goNext = React.useCallback(() => goTo(activeIndex + 1, true), [goTo, activeIndex])

  const activeIndexRef = React.useRef(activeIndex)
  React.useEffect(() => { activeIndexRef.current = activeIndex }, [activeIndex])

  const goToRef = React.useRef(goTo)
  React.useEffect(() => { goToRef.current = goTo }, [goTo])

  const initialIndex = React.useMemo(() => {
    if (startAt === "End") return maxIndex
    return 0
  }, [startAt, maxIndex])

  React.useEffect(() => {
    if (isCanvas) return
    if (itemCount > 0) {
      goTo(initialIndex, false)
    }
  }, [initialIndex, itemCount, isCanvas, goTo])

  React.useEffect(() => {
    if (isCanvas) return
    if (loop) return
    if (activeIndex > maxIndex) {
      goToRef.current(maxIndex, true)
    }
  }, [maxIndex, loop, isCanvas, activeIndex])

  React.useEffect(() => {
    if (isCanvas) return
    if (slideSize <= 0) return
    const target = calcTargetTranslate(activeIndex)
    setTranslate(target)
  }, [slideSize, activeIndex, calcTargetTranslate, setTranslate, isCanvas])

  React.useEffect(() => {
    if (!autoPlay || isCanvas || itemCount <= itemsPerView || reducedMotion) return
    if (pauseOnHover && isActive) return
    const ms = clamp(interval, 0.5, 30) * 1000
    const t = window.setInterval(() => goToRef.current(activeIndexRef.current + 1, true), ms)
    return () => window.clearInterval(t)
  }, [autoPlay, interval, itemCount, itemsPerView, isActive, pauseOnHover, isCanvas, reducedMotion])

  const handleKeyDown = React.useCallback((e: React.KeyboardEvent) => {
    if (!navigation.keyboard || isCanvas) return
    const tag = (e.target as HTMLElement)?.tagName?.toLowerCase()
    if (tag === "input" || tag === "textarea" || tag === "select") return
    if ((e.target as HTMLElement)?.isContentEditable) return

    const keys = isVertical ? { prev: "ArrowUp", next: "ArrowDown" } : { prev: "ArrowLeft", next: "ArrowRight" }
    if (e.key === keys.prev) {
      e.preventDefault()
      goPrev()
    } else if (e.key === keys.next) {
      e.preventDefault()
      goNext()
    }
  }, [navigation.keyboard, isCanvas, isVertical, goPrev, goNext])

  const dragRef = React.useRef({
    dragging: false,
    startPos: 0,
    startTranslate: 0,
    lastPos: 0,
    lastTime: 0,
    velocity: 0,
    moved: false,
    captured: false,
  })
  const trackRef = React.useRef<HTMLDivElement>(null)
  const wheelRef = React.useRef({ accum: 0, lastStepAt: 0, quietId: 0 })
  const clickSuppressTimeoutRef = React.useRef<number | null>(null)
  const clickSuppressListenerRef = React.useRef<any>(null)

  React.useEffect(() => {
    return () => {
      controlsRef.current?.stop()
      if (clickSuppressTimeoutRef.current != null) {
        window.clearTimeout(clickSuppressTimeoutRef.current)
      }
      if (clickSuppressListenerRef.current) {
        window.removeEventListener("click", clickSuppressListenerRef.current, { capture: true })
      }
    }
  }, [])

  const getCurrentTranslate = () => (isVertical ? y.get() : x.get())

  const onPointerDown = (e: React.PointerEvent) => {
    if (!draggable || isCanvas) return
    controlsRef.current?.stop()
    const pos = isVertical ? e.clientY : e.clientX
    const now = performance.now()
    dragRef.current.dragging = true
    dragRef.current.startPos = pos
    dragRef.current.startTranslate = getCurrentTranslate()
    dragRef.current.lastPos = pos
    dragRef.current.lastTime = now
    dragRef.current.velocity = 0
    dragRef.current.moved = false
    dragRef.current.captured = false
    React.startTransition(() => { setIsDragging(true) })
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return
    const pos = isVertical ? e.clientY : e.clientX
    const diff = pos - dragRef.current.startPos
    if (Math.abs(diff) > DRAG_MOVE_THRESHOLD_PX) {
      dragRef.current.moved = true
      if (!dragRef.current.captured) {
        try {
          ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
          dragRef.current.captured = true
        } catch {}
      }
    }
    const now = performance.now()
    const dt = now - dragRef.current.lastTime
    if (dt > 0) {
      dragRef.current.velocity = (pos - dragRef.current.lastPos) / dt
    }
    dragRef.current.lastTime = now
    dragRef.current.lastPos = pos

    const maxTranslateAbs = navigation.step === "Page" ? maxIndex * itemsPerView * slideSize : maxIndex * slideSize
    let nextTranslate = dragRef.current.startTranslate + diff
    const minTranslate = isReversed ? 0 : -maxTranslateAbs
    const maxTranslate = isReversed ? maxTranslateAbs : 0

    if (nextTranslate > maxTranslate) nextTranslate = maxTranslate + (nextTranslate - maxTranslate) * DRAG_RESIST
    else if (nextTranslate < minTranslate) nextTranslate = minTranslate + (nextTranslate - minTranslate) * DRAG_RESIST
    setTranslate(nextTranslate)
  }

  const onPointerUp = (e: React.PointerEvent) => {
    if (!dragRef.current.dragging) return
    dragRef.current.dragging = false
    React.startTransition(() => { setIsDragging(false) })
    if (dragRef.current.captured) {
      try {
        ;(e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId)
      } catch {}
      dragRef.current.captured = false
    }
    if (!dragRef.current.moved) return

    const v = dragRef.current.velocity
    const currentT = getCurrentTranslate()
    const projection = clamp(v, -DRAG_VELOCITY_CLAMP, DRAG_VELOCITY_CLAMP) * DRAG_PROJECTION_MULTIPLIER
    const projected = currentT + projection
    const safeSlideSize = Math.max(1, slideSize)
    const signedProjected = isReversed ? projected : -projected
    let targetIndex = 0

    if (navigation.step === "Page") {
      const pageSize = itemsPerView * safeSlideSize
      targetIndex = Math.round(signedProjected / Math.max(1, pageSize))
    } else {
      targetIndex = Math.round(signedProjected / safeSlideSize)
    }

    targetIndex = loop ? ((targetIndex % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1) : clamp(targetIndex, 0, maxIndex)
    goTo(targetIndex, true)

    const preventClick = (ev: MouseEvent) => {
      ev.preventDefault()
      ev.stopPropagation()
    }
    clickSuppressListenerRef.current = preventClick
    window.addEventListener("click", preventClick, { capture: true, once: true })
    if (clickSuppressTimeoutRef.current != null) {
      window.clearTimeout(clickSuppressTimeoutRef.current)
    }
    clickSuppressTimeoutRef.current = window.setTimeout(() => {
      window.removeEventListener("click", preventClick, { capture: true })
      clickSuppressListenerRef.current = null
      clickSuppressTimeoutRef.current = null
    }, CLICK_SUPPRESS_MS)
  }

  React.useEffect(() => {
    if (isFrozen || !draggable) return
    const node = trackRef.current
    if (!node) return
    const handler = (e: WheelEvent) => {
      if (dragRef.current.dragging) return
      const primary = isVertical ? e.deltaY : e.deltaX
      const perpendicular = isVertical ? e.deltaX : e.deltaY
      if (Math.abs(primary) <= Math.abs(perpendicular)) return
      if (Math.abs(primary) < 1) return
      e.preventDefault()

      const now = performance.now()
      if (now - wheelRef.current.lastStepAt > WHEEL_COOLDOWN_MS) {
        wheelRef.current.accum += primary
      }
      if (wheelRef.current.quietId) {
        window.clearTimeout(wheelRef.current.quietId)
      }
      wheelRef.current.quietId = window.setTimeout(() => {
        wheelRef.current.accum = 0
      }, WHEEL_QUIET_MS)

      if (Math.abs(wheelRef.current.accum) >= WHEEL_STEP_THRESHOLD) {
        const dir = wheelRef.current.accum > 0 ? 1 : -1
        wheelRef.current.accum = 0
        wheelRef.current.lastStepAt = now
        controlsRef.current?.stop()
        const current = activeIndexRef.current
        const proposed = current + dir
        const total = maxIndex + 1
        const target = loop ? ((proposed % total) + total) % total : clamp(proposed, 0, maxIndex)
        goToRef.current(target, true)
      }
    }
    node.addEventListener("wheel", handler, { passive: false })
    return () => {
      node.removeEventListener("wheel", handler)
      if (wheelRef.current.quietId) {
        window.clearTimeout(wheelRef.current.quietId)
        wheelRef.current.quietId = 0
      }
    }
  }, [isFrozen, draggable, isVertical, maxIndex, loop])

  const arrowBtnStyle: React.CSSProperties = React.useMemo(() => {
    const useFill = arrows.variant === "Fill" || arrows.variant === "Both"
    const useBorder = arrows.variant === "Outline" || arrows.variant === "Both"
    return {
      width: arrows.size,
      height: arrows.size,
      borderRadius: arrows.radius,
      background: useFill ? arrows.backdrop : "transparent",
      color: arrows.fill,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: useBorder ? `${arrows.borderWidth}px solid ${arrows.borderColor}` : "none",
      padding: 0,
      margin: 0,
      boxSizing: "border-box" as const,
      font: "inherit",
      lineHeight: 0,
      cursor: "pointer",
      transition: "opacity 0.2s ease, transform 0.15s ease",
      opacity: showArrowsNow ? 1 : 0,
      pointerEvents: isCanvas ? "none" : showArrowsNow ? "auto" : "none",
      boxShadow: arrows.shadow ? `0 4px ${arrows.shadowBlur}px ${arrows.shadowColor}` : "none",
      flexShrink: 0,
      appearance: "none",
      WebkitAppearance: "none",
    }
  }, [arrows.size, arrows.radius, arrows.backdrop, arrows.fill, arrows.variant, arrows.borderWidth, arrows.borderColor, arrows.shadow, arrows.shadowBlur, arrows.shadowColor, showArrowsNow, isCanvas])

  const getArrowPositionStyle = (side?: string): React.CSSProperties => {
    const isSplit = arrows.type === "Split"
    const base = computeAlignmentStyle({
      alignment: arrows.alignment,
      inset: arrows.inset,
      offX: arrows.offsetX,
      offY: arrows.offsetY,
      splitSide: isSplit ? side : undefined,
    })
    return { ...base, display: "flex", flexDirection: "row" as const, alignItems: "center", pointerEvents: "none" as const, gap: isSplit ? undefined : arrows.gap }
  }

  const renderIcon = (type: "prev" | "next") => {
    const customSrc = type === "prev" ? arrows.prevImage : arrows.nextImage
    const DefaultSvg = type === "prev" ? ChevronLeft : ChevronRight
    let rotation = "0deg"
    if (!customSrc && isVertical) rotation = "90deg"
    if (customSrc) {
      return <img src={customSrc} style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }} alt="" aria-hidden="true" />
    }
    return (
      <div style={{ transform: `rotate(${rotation})`, display: "flex" }}>
        <DefaultSvg size={arrows.size} color={arrows.fill} />
      </div>
    )
  }

  const renderPaginationContent = (relativeToChildren = false) => {
    if (dots.type === "None") return null
    if (dots.type === "Dots") {
      const compact = dots.compact && dotCount > dots.compactVisible
      const visible = Math.max(1, Math.min(dots.compactVisible, dotCount))
      const slotSize = dots.size + dots.gap
      const stripWidth = visible * dots.size + (visible - 1) * dots.gap
      const halfVis = Math.floor(visible / 2)
      const windowStart = compact ? clamp(safeActiveIndex - halfVis, 0, dotCount - visible) : 0
      const windowEnd = windowStart + visible - 1
      const translate = compact ? -windowStart * slotSize : 0
      const isInWindow = (i: number) => !compact || (i >= windowStart && i <= windowEnd)
      const getDotScale = (i: number) => (i === safeActiveIndex ? ACTIVE_DOT_SCALE : 1)
      const getDotOpacity = (i: number) => {
        if (!isInWindow(i)) return 0
        if (i === safeActiveIndex) return 1
        return dots.opacity
      }

      const dotButtons = Array.from({ length: dotCount }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            goTo(i, true)
          }}
          role="tab"
          aria-selected={i === safeActiveIndex}
          aria-label={`${navigation.step === "Page" ? "Page" : "Slide"} ${i + 1}`}
          style={{
            borderRadius: "50%",
            border: "none",
            padding: 0,
            cursor: "pointer",
            transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease, background 0.2s ease",
            width: dots.size,
            height: dots.size,
            flexShrink: 0,
            background: i === safeActiveIndex ? dots.activeFill : dots.fill,
            opacity: getDotOpacity(i),
            transform: `scale(${getDotScale(i)})`,
          }}
        />
      ))

      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: compact ? "flex-start" : "center",
            padding: dots.padding,
            borderRadius: dots.radius,
            background: dots.backdrop,
            backdropFilter: dots.blur > 0 ? `blur(${dots.blur}px)` : undefined,
            pointerEvents: isCanvas ? "none" : "auto",
            overflow: compact ? "hidden" : "visible",
            width: compact ? stripWidth + dots.padding * 2 : undefined,
            boxSizing: "border-box",
          }}
          role="tablist"
          aria-label="Slide navigation"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: dots.gap,
              transform: `translateX(${translate}px)`,
              transition: compact ? "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)" : undefined,
              flexShrink: 0,
            }}
          >
            {dotButtons}
          </div>
        </div>
      )
    }

    if (dots.type === "Progress") {
      const total = Math.max(1, dotCount)
      const progressWidth = relativeToChildren ? "100%" : dots.progressWidth
      if (dots.compact) {
        const segmentGap = 3
        return (
          <div style={{ width: progressWidth, display: "flex", gap: segmentGap, pointerEvents: isCanvas ? "none" : "auto" }} role="tablist" aria-label="Slide navigation">
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  goTo(i, true)
                }}
                role="tab"
                aria-selected={i === safeActiveIndex}
                aria-label={`${navigation.step === "Page" ? "Page" : "Slide"} ${i + 1}`}
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: PROGRESS_BAR_HEIGHT,
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  borderRadius: dots.radius,
                  background: i <= safeActiveIndex ? dots.activeFill : dots.backdrop,
                  backdropFilter: dots.blur > 0 ? `blur(${dots.blur}px)` : undefined,
                  transition: "background 0.3s ease",
                }}
              />
            ))}
          </div>
        )
      }

      return (
        <div
          style={{
            width: progressWidth,
            height: PROGRESS_BAR_HEIGHT,
            background: dots.backdrop,
            borderRadius: dots.radius,
            overflow: "hidden",
            backdropFilter: dots.blur > 0 ? `blur(${dots.blur}px)` : undefined,
            pointerEvents: isCanvas ? "none" : "auto",
          }}
        >
          <motion.div
            style={{ width: "100%", height: "100%", background: dots.activeFill, transformOrigin: "left center" }}
            animate={{ scaleX: (safeActiveIndex + 1) / total }}
            transition={animationOptions}
          />
        </div>
      )
    }

    if (dots.type === "Numbers") {
      return (
        <div
          style={{
            padding: `${dots.padding * 0.5}px ${dots.padding}px`,
            background: dots.backdrop,
            borderRadius: dots.radius,
            backdropFilter: dots.blur > 0 ? `blur(${dots.blur}px)` : undefined,
            fontFamily: "inherit",
            fontSize: 13,
            fontWeight: 500,
            color: dots.fill,
            display: "flex",
            gap: 4,
            pointerEvents: isCanvas ? "none" : "auto",
          }}
        >
          <span style={{ color: dots.activeFill }}>{safeActiveIndex + 1}</span>
          <span>/</span>
          <span>{dotCount}</span>
        </div>
      )
    }
    return null
  }

  const isPaginationTop = dots.alignment.includes("Top")
  const isInlineTop = arrows.alignment.includes("Top")
  const showInlineRow = arrows.show && showNav && arrows.type === "Inline"
  const showStandalonePagination = !showInlineRow && showNav && dots.type !== "None"
  const horizontalJustify = (a: string) => (a.includes("Left") ? "flex-start" : a.includes("Right") ? "flex-end" : "center")

  const paginationRowStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 11,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: horizontalJustify(dots.alignment),
    marginTop: isPaginationTop ? 0 : dots.inset,
    marginBottom: isPaginationTop ? dots.inset : 0,
    transform: dots.offsetX || dots.offsetY ? `translate(${dots.offsetX}px, ${dots.offsetY}px)` : undefined,
  }

  const childrenOverflowAfter = childrenFrame ? Math.max(0, childrenFrame.bottom - childrenViewportHeight) : 0
  const standalonePaginationRowStyle: React.CSSProperties = {
    ...paginationRowStyle,
    marginTop: isPaginationTop ? paginationRowStyle.marginTop : dots.inset + childrenOverflowAfter,
    ...(childrenFrame ? { width: childrenFrame.width, marginLeft: childrenFrame.left } : { paddingLeft: layout.padding, paddingRight: layout.padding }),
    boxSizing: "border-box",
  }

  const inlineRowOuterStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 11,
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: horizontalJustify(arrows.alignment),
    marginTop: isInlineTop ? 0 : arrows.inset,
    marginBottom: isInlineTop ? arrows.inset : 0,
    transform: arrows.offsetX || arrows.offsetY ? `translate(${arrows.offsetX}px, ${arrows.offsetY}px)` : undefined,
    pointerEvents: "none",
  }

  const inlineRowInnerStyle: React.CSSProperties = { display: "flex", flexDirection: "row", alignItems: "center", gap: arrows.gap }

  const trackClass = `cms-slider-track-${instanceId}`
  const centerIndex = React.useMemo(() => {
    if (!centerFocus.enabled) return -1
    if (navigation.step === "Page") {
      const pageStart = activeIndex * itemsPerView
      return pageStart + Math.floor(itemsPerView / 2)
    }
    return activeIndex + Math.floor(itemsPerView / 2)
  }, [centerFocus.enabled, activeIndex, itemsPerView, navigation.step])

  const centerFocusCSS = React.useMemo(() => {
    if (!centerFocus.enabled || itemCount === 0) return ""
    const rules: string[] = []
    const speed = centerFocus.transitionSpeed

    rules.push(`
      .${trackClass} > * > * {
        transition: transform ${speed}s ease, opacity ${speed}s ease, filter ${speed}s ease !important;
        opacity: ${centerFocus.inactiveOpacity} !important;
        transform: scale(${centerFocus.inactiveScale}) translateZ(0) !important;
        transform-origin: center center !important;
      }
    `)

    if (centerIndex >= 0 && centerIndex < itemCount) {
      rules.push(`
        .${trackClass} > * > *:nth-child(${centerIndex + 1}) {
          opacity: 1 !important;
          transform: scale(${centerFocus.activeScale}) translateZ(0) !important;
        }
      `)
    }
    return rules.join("\n")
  }, [centerFocus.enabled, centerFocus.transitionSpeed, centerFocus.inactiveOpacity, centerFocus.inactiveScale, centerFocus.activeScale, centerIndex, itemCount, trackClass])

  const alignMap: Record<string, string> = { Start: "flex-start", Center: "center", End: "flex-end", Stretch: "stretch" }
  const flexAlign = alignMap[itemAlign as string] || "stretch"

  const cssVars = React.useMemo(
    () =>
      ({
        "--slider-gap": `${layout.gap}px`,
        "--slider-items": `${itemsPerView}`,
        "--flex-dir": isVertical ? "column" : "row",
        "--slider-align": flexAlign,
      } as React.CSSProperties),
    [layout.gap, itemsPerView, isVertical, flexAlign]
  )

  const css = React.useMemo(
    () => `
      .${trackClass} {
        will-change: transform;
        backface-visibility: hidden;
        -webkit-backface-visibility: hidden;
      }
      .${trackClass} > * {
        display: flex !important;
        flex-direction: var(--flex-dir) !important;
        flex-wrap: nowrap !important;
        justify-content: flex-start !important;
        align-items: var(--slider-align) !important;
        width: 100% !important;
        height: ${shouldFillFrame ? "100%" : "auto"} !important;
        gap: var(--slider-gap) !important;
        grid-template-columns: none !important;
        box-sizing: border-box !important;
      }
      .${trackClass} > * > * {
        --total-gap: calc((var(--slider-items) - 1) * var(--slider-gap));
        --item-size: calc((100% - var(--total-gap)) / var(--slider-items));

        flex: 0 0 var(--item-size) !important;

        ${isVertical ? "height: var(--item-size) !important;" : "width: var(--item-size) !important;"}
        ${isVertical ? "min-height: var(--item-size) !important;" : "min-width: var(--item-size) !important;"}
        ${shouldFillFrame ? (isVertical ? "width: 100% !important;" : "height: 100% !important;") : ""}
        ${layout.aspectRatio > 0 ? `aspect-ratio: ${layout.aspectRatio} !important;` : ""}
        ${layout.aspectRatio > 0 && !isVertical && !shouldFillFrame ? "height: auto !important;" : ""}
        ${layout.aspectRatio > 0 && isVertical && !shouldFillFrame ? "width: auto !important;" : ""}
        max-width: none !important;
        max-height: none !important;

        margin: 0 !important;
        flex-shrink: 0 !important;
        box-sizing: border-box !important;
        transform: translateZ(0);
      }
      .${trackClass} > * > * > *:only-child {
        width: 100% !important;
        ${shouldFillFrame ? "height: 100% !important;" : ""}
        min-height: 0 !important;
        flex: 1 1 auto !important;
      }
      .${trackClass} a {
        cursor: pointer !important;
        user-select: none !important;
        -webkit-user-drag: none !important;
        pointer-events: auto !important;
      }
      .${trackClass} img {
        pointer-events: none !important;
        -webkit-user-drag: none !important;
        user-drag: none !important;
      }
    `,
    [trackClass, isVertical, shouldFillFrame, layout.aspectRatio]
  )

  const appearAnimName = `cmsslider-appear-${instanceId}`
  const effectiveAppearMode = centerFocus.enabled ? "All Together" : appear.mode

  const appearKeyframes = React.useMemo(() => {
    const t = appear.type
    if (t === "None" || reducedMotion) return ""
    const d = appear.distance
    let from = "opacity: 0;"
    let to = "opacity: 1;"
    if (t === "Slide Up") {
      from += ` transform: translateY(${d}px);`
      to += ` transform: translateY(0);`
    } else if (t === "Slide Down") {
      from += ` transform: translateY(-${d}px);`
      to += ` transform: translateY(0);`
    } else if (t === "Scale") {
      from += ` transform: scale(0.96);`
      to += ` transform: scale(1);`
    } else if (t === "Blur") {
      from += ` filter: blur(10px);`
      to += ` filter: none;`
    }
    return `@keyframes ${appearAnimName} { from { ${from} } to { ${to} } }`
  }, [appear.type, appear.distance, appearAnimName, reducedMotion])

  const appearStyle = React.useMemo(
    () =>
      appear.type === "None" || reducedMotion || effectiveAppearMode !== "All Together"
        ? {}
        : {
            opacity: 0,
            animation: `${appearAnimName} ${appear.duration}s cubic-bezier(0.32, 0.72, 0, 1) both`,
          },
    [appear.type, reducedMotion, effectiveAppearMode, appearAnimName, appear.duration]
  )

  const itemAppearCSS = React.useMemo(() => {
    if (appear.type === "None" || effectiveAppearMode !== "Stagger" || reducedMotion) return ""
    const cap = Math.min(itemCount > 0 ? itemCount : STAGGER_CAP, STAGGER_CAP)
    const stagger = Math.max(0, appear.stagger)
    const delayRules = Array.from({ length: cap })
      .map((_, i) => `.${trackClass} > * > *:nth-child(${i + 1}) { animation-delay: ${(i * stagger).toFixed(3)}s; }`)
      .join("\n")
    return `
      .${trackClass} > * > * {
        opacity: 0;
        animation: ${appearAnimName} ${appear.duration}s cubic-bezier(0.32, 0.72, 0, 1) both;
      }
      ${delayRules}
    `
  }, [appear.type, effectiveAppearMode, appear.duration, appear.stagger, reducedMotion, itemCount, trackClass, appearAnimName])

  const styleSheet = React.useMemo(
    () => `${css}
      [data-cms-slider]:focus-visible { outline: 2px solid #4c8eff; outline-offset: -2px; }
      [data-cms-slider]:focus:not(:focus-visible) { outline: none; }
      ${appearKeyframes}
      ${itemAppearCSS}
    `,
    [css, appearKeyframes, itemAppearCSS]
  )

  if (!content) return null

  return (
    <div
      style={{
        ...style,
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: shouldFillFrame ? "100%" : "auto",
        ...cssVars,
        minWidth: 200,
        minHeight: shouldFillFrame ? 200 : 0,
        ...(isReady ? appearStyle : { opacity: 0 }),
      }}
      onMouseEnter={() => React.startTransition(() => setIsHovered(true))}
      onMouseLeave={() => React.startTransition(() => setIsHovered(false))}
      onFocus={() => React.startTransition(() => setIsFocused(true))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          React.startTransition(() => setIsFocused(false))
        }
      }}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      data-cms-slider
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
    >
      <style>{styleSheet}</style>
      {centerFocusCSS && <style>{centerFocusCSS}</style>}

      <div
        aria-live="polite"
        aria-atomic="true"
        style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        {`${navigation.step === "Page" ? "Page" : "Slide"} ${safeActiveIndex + 1} of ${dotCount}`}
      </div>

      {showInlineRow && isInlineTop && (
        <div style={inlineRowOuterStyle}>
          <div style={inlineRowInnerStyle}>
            <button type="button" onClick={(e) => { e.stopPropagation(); goPrev() }} style={arrowBtnStyle} aria-label="Previous slide">
              {renderIcon("prev")}
            </button>
            {dots.type !== "None" && renderPaginationContent()}
            <button type="button" onClick={(e) => { e.stopPropagation(); goNext() }} style={arrowBtnStyle} aria-label="Next slide">
              {renderIcon("next")}
            </button>
          </div>
        </div>
      )}

      <div style={{ position: "relative", flex: shouldFillFrame ? "1 1 auto" : "0 0 auto", minHeight: 0, minWidth: 0 }}>
        {showStandalonePagination && isPaginationTop && <div style={standalonePaginationRowStyle}>{renderPaginationContent(true)}</div>}

        <div
          ref={containerRef}
          style={{
            width: "100%",
            height: shouldFillFrame ? "100%" : "auto",
            position: "relative",
            overflow: "visible",
            clipPath: centerFocus.enabled || layout.bleed === "Both" ? undefined : layout.bleed === "Right" ? (isVertical ? "inset(0 -9999px -9999px -9999px)" : "inset(-9999px -9999px -9999px 0)") : isVertical ? "inset(0 -9999px)" : "inset(-9999px 0)",
            padding: layout.padding,
            boxSizing: "border-box",
          }}
        >
          {isFrozen ? (
            <div className={trackClass} style={{ display: "flex", flexDirection: isVertical ? "column" : "row", width: "100%", height: shouldFillFrame ? "100%" : "auto" }}>
              {normalizedContent}
            </div>
          ) : (
            <motion.div
              ref={trackRef}
              className={trackClass}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              style={{
                display: "flex",
                flexDirection: isVertical ? "column" : "row",
                width: "100%",
                height: shouldFillFrame ? "100%" : "auto",
                cursor: draggable ? (isDragging ? "grabbing" : "grab") : "default",
                touchAction: isVertical ? "pan-x" : "pan-y",
                userSelect: "none",
                x: isVertical ? undefined : x,
                y: isVertical ? y : undefined,
              }}
            >
              {normalizedContent}
            </motion.div>
          )}
        </div>

        {arrows.show && showNav && arrows.type === "Split" && (
          <>
            <div style={getArrowPositionStyle("prev")}>
              <button type="button" onClick={(e) => { e.stopPropagation(); goPrev() }} style={arrowBtnStyle} aria-label="Previous slide">
                {renderIcon("prev")}
              </button>
            </div>
            <div style={getArrowPositionStyle("next")}>
              <button type="button" onClick={(e) => { e.stopPropagation(); goNext() }} style={arrowBtnStyle} aria-label="Next slide">
                {renderIcon("next")}
              </button>
            </div>
          </>
        )}

        {arrows.show && showNav && arrows.type === "Grouped" && (
          <div style={getArrowPositionStyle()}>
            <button type="button" onClick={(e) => { e.stopPropagation(); goPrev() }} style={arrowBtnStyle} aria-label="Previous slide">
              {renderIcon("prev")}
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); goNext() }} style={arrowBtnStyle} aria-label="Next slide">
              {renderIcon("next")}
            </button>
          </div>
        )}

        {showStandalonePagination && !isPaginationTop && <div style={standalonePaginationRowStyle}>{renderPaginationContent(true)}</div>}
      </div>

      {showInlineRow && !isInlineTop && (
        <div style={inlineRowOuterStyle}>
          <div style={inlineRowInnerStyle}>
            <button type="button" onClick={(e) => { e.stopPropagation(); goPrev() }} style={arrowBtnStyle} aria-label="Previous slide">
              {renderIcon("prev")}
            </button>
            {dots.type !== "None" && renderPaginationContent()}
            <button type="button" onClick={(e) => { e.stopPropagation(); goNext() }} style={arrowBtnStyle} aria-label="Next slide">
              {renderIcon("next")}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
