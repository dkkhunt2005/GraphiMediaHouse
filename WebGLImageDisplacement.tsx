import React, { useRef, useEffect, useState } from 'react'

interface WebGLImageDisplacementProps {
  src: string
  alt: string
  className?: string
  aspectRatio?: string
  priority?: boolean
}

export const WebGLImageDisplacement: React.FC<WebGLImageDisplacementProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'aspect-[16/10]',
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true })
    if (!gl) return

    // Vertex shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        v_uv.y = 1.0 - v_uv.y;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader with wave ripple & subtle chromatic aberration
    const fsSource = `
      precision mediump float;
      uniform sampler2D u_image;
      uniform vec2 u_mouse;
      uniform float u_hover;
      uniform float u_time;
      varying vec2 v_uv;

      void main() {
        vec2 uv = v_uv;
        vec2 mouse = u_mouse;

        // Distance from cursor
        float dist = distance(uv, mouse);

        // Ripple wave formula
        float wave = sin(dist * 22.0 - u_time * 4.5) * exp(-dist * 4.0) * u_hover;
        vec2 dir = normalize(uv - mouse + 0.0001);
        vec2 displacedUv = uv + dir * wave * 0.04;

        // Chromatic aberration on wave edges
        float r = texture2D(u_image, displacedUv + dir * wave * 0.015).r;
        float g = texture2D(u_image, displacedUv).g;
        float b = texture2D(u_image, displacedUv - dir * wave * 0.015).b;

        // Subtle contrast boost on hover
        vec3 col = vec3(r, g, b);
        col = mix(col, col * 1.05 + 0.01, u_hover);

        gl_FragColor = vec4(col, 1.0);
      }
    `

    const createShader = (glCtx: WebGLRenderingContext, type: number, source: string) => {
      const shader = glCtx.createShader(type)
      if (!shader) return null
      glCtx.shaderSource(shader, source)
      glCtx.compileShader(shader)
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return
    }

    gl.useProgram(program)

    // Position quad
    const posBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer)
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0,
      ]),
      gl.STATIC_DRAW
    )

    const aPos = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    // Uniforms
    const uImageLoc = gl.getUniformLocation(program, 'u_image')
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse')
    const uHoverLoc = gl.getUniformLocation(program, 'u_hover')
    const uTimeLoc = gl.getUniformLocation(program, 'u_time')

    // Texture setup
    const texture = gl.createTexture()
    const img = new Image()
    img.crossOrigin = 'anonymous'

    let animationId: number
    let hoverState = 0
    let targetHover = 0
    let mouse = { x: 0.5, y: 0.5 }
    let targetMouse = { x: 0.5, y: 0.5 }
    let startTime = performance.now()
    let isComponentMounted = true

    img.onload = () => {
      if (!isComponentMounted) return
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)
      setIsLoaded(true)
    }
    img.src = src

    const updateSize = () => {
      if (!container || !canvas) return
      const rect = container.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      targetMouse.x = (e.clientX - rect.left) / rect.width
      targetMouse.y = (e.clientY - rect.top) / rect.height
    }

    const handleMouseEnter = () => {
      targetHover = 1
      setIsHovered(true)
    }

    const handleMouseLeave = () => {
      targetHover = 0
      setIsHovered(false)
    }

    // Touch support for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (!e.touches.length) return
      const touch = e.touches[0]
      const rect = container.getBoundingClientRect()
      targetMouse.x = (touch.clientX - rect.left) / rect.width
      targetMouse.y = (touch.clientY - rect.top) / rect.height
      targetHover = 1
      setIsHovered(true)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!e.touches.length) return
      const touch = e.touches[0]
      const rect = container.getBoundingClientRect()
      targetMouse.x = (touch.clientX - rect.left) / rect.width
      targetMouse.y = (touch.clientY - rect.top) / rect.height
    }

    const handleTouchEnd = () => {
      // Gently release hover on touch lift
      setTimeout(() => {
        targetHover = 0
        setIsHovered(false)
      }, 350)
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseenter', handleMouseEnter)
    container.addEventListener('mouseleave', handleMouseLeave)
    container.addEventListener('touchstart', handleTouchStart, { passive: true })
    container.addEventListener('touchmove', handleTouchMove, { passive: true })
    container.addEventListener('touchend', handleTouchEnd, { passive: true })

    // Auto-ripple wave when image enters viewport on mobile/scroll
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Trigger a gentle auto-shimmer pulse
        targetHover = 0.8
        targetMouse.x = 0.5
        targetMouse.y = 0.5
        setTimeout(() => {
          if (!isHovered) {
            targetHover = 0
          }
        }, 900)
      }
    }, { threshold: 0.35 })
    observer.observe(container)

    const render = () => {
      // Lerp mouse and hover
      mouse.x += (targetMouse.x - mouse.x) * 0.12
      mouse.y += (targetMouse.y - mouse.y) * 0.12
      hoverState += (targetHover - hoverState) * 0.08

      const time = (performance.now() - startTime) * 0.001

      gl.uniform1i(uImageLoc, 0)
      gl.uniform2f(uMouseLoc, mouse.x, mouse.y)
      gl.uniform1f(uHoverLoc, hoverState)
      gl.uniform1f(uTimeLoc, time)

      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationId = requestAnimationFrame(render)
    }

    render()

    return () => {
      isComponentMounted = false
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', updateSize)
      container.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseenter', handleMouseEnter)
      container.removeEventListener('mouseleave', handleMouseLeave)
      container.removeEventListener('touchstart', handleTouchStart)
      container.removeEventListener('touchmove', handleTouchMove)
      container.removeEventListener('touchend', handleTouchEnd)
      observer.disconnect()
      gl.deleteProgram(program)
      gl.deleteTexture(texture)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [src])

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-neutral-900 ${aspectRatio} ${className} cursor-pointer group`}
    >
      {/* Fallback & Initial Image */}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={`w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Hardware-accelerated WebGL Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Lens Flare / Vignette Accent on Hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-300 ${
          isHovered
            ? 'opacity-100 bg-gradient-to-t from-black/60 via-transparent to-brand-gold/10'
            : 'opacity-0'
        }`}
      />
    </div>
  )
}
