import React, { useEffect, useRef } from 'react'

interface ArchitecturalGridCanvasProps {
  className?: string
  intensity?: number
}

export const ArchitecturalGridCanvas: React.FC<ArchitecturalGridCanvasProps> = ({
  className = '',
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    if (!gl) {
      console.warn('WebGL not supported on this device/browser')
      return
    }

    // Vertex shader: Full-screen quad
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_uv;
      void main() {
        v_uv = (a_position + 1.0) * 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader: Architectural perspective grid & dynamic lighting
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_intensity;
      varying vec2 v_uv;

      // Pseudo-random noise
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        st.y = 1.0 - st.y;
        vec2 aspect = vec2(u_resolution.x / u_resolution.y, 1.0);
        vec2 uv = (st - 0.5) * aspect;

        vec2 mouse = (u_mouse / u_resolution.xy - 0.5) * aspect;
        mouse.y = -mouse.y;

        // Perspective 3D grid transformation
        float horizon = 0.15;
        float depth = 1.0 / (abs(st.y - horizon) + 0.18);
        vec2 gridUv = vec2(uv.x * depth, depth + u_time * 0.25);

        // Distance to cursor
        float mouseDist = length(uv - mouse);
        float mouseInfluence = smoothstep(0.45, 0.02, mouseDist);

        // Architectural Grid lines
        vec2 grid = abs(fract(gridUv * 6.0 - 0.5) - 0.5) / fwidth(gridUv * 6.0);
        float line = min(grid.x, grid.y);
        float gridPattern = 1.0 - min(line, 1.0);

        // Subtle vertical architectural structural guides
        float vertLine = abs(fract(st.x * 12.0 - 0.5) - 0.5);
        float structuralGrid = smoothstep(0.02, 0.0, vertLine) * 0.15;

        // Glowing points at intersections
        vec2 pointPos = abs(fract(gridUv * 6.0) - 0.5);
        float points = smoothstep(0.12, 0.02, length(pointPos)) * mouseInfluence;

        // Color grading: Studio Deep Charcoal and Gold
        vec3 baseColor = vec3(0.04, 0.04, 0.04);
        vec3 gridColor = vec3(0.22, 0.22, 0.22);
        vec3 goldAccent = vec3(0.90, 0.77, 0.0); // Brand Gold (#E6C500)
        vec3 lightBeam = vec3(0.85, 0.85, 0.90) * (0.05 / (mouseDist + 0.25));

        // Fade out grid near horizon and edges
        float vignette = smoothstep(0.0, 0.4, st.y) * smoothstep(1.0, 0.6, st.y);
        float sideFade = smoothstep(0.0, 0.2, st.x) * smoothstep(1.0, 0.8, st.x);
        float mask = vignette * sideFade;

        vec3 color = baseColor;
        color += gridColor * gridPattern * 0.45 * mask;
        color += structuralGrid * vec3(0.18);
        color += goldAccent * (points * 1.8 + mouseInfluence * 0.22) * mask;
        color += lightBeam * 0.15 * mask;

        // Subtle film grain
        float grain = (hash(st * 40.0 + u_time) - 0.5) * 0.025;
        color += vec3(grain);

        gl_FragColor = vec4(color * u_intensity, 0.92);
      }
    `

    // Helper: Compile shader
    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type)
      if (!shader) return null
      glCtx.shaderSource(shader, source)
      glCtx.compileShader(shader)
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('Shader compilation error:', glCtx.getShaderInfoLog(shader))
        glCtx.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource)
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Full-screen quad geometry
    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
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

    const aPositionLoc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(aPositionLoc)
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution')
    const uMouseLoc = gl.getUniformLocation(program, 'u_mouse')
    const uTimeLoc = gl.getUniformLocation(program, 'u_time')
    const uIntensityLoc = gl.getUniformLocation(program, 'u_intensity')

    let animationFrameId: number
    let startTime = performance.now()
    let mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }
    let targetMouse = { ...mouse }
    let isVisible = true
    let lastUserInteractionTime = 0
    let gyroOffset = { x: 0, y: 0 }

    // Resize handling
    const resize = () => {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr
        canvas.height = height * dpr
        gl.viewport(0, 0, canvas.width, canvas.height)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    // Mouse tracking with smooth lerp
    const handleMouseMove = (e: MouseEvent) => {
      lastUserInteractionTime = performance.now()
      const rect = canvas.getBoundingClientRect()
      targetMouse.x = (e.clientX - rect.left) * (canvas.width / rect.width)
      targetMouse.y = (e.clientY - rect.top) * (canvas.height / rect.height)
    }

    // Touch tracking for mobile devices
    const handleTouch = (e: TouchEvent) => {
      if (!e.touches.length) return
      lastUserInteractionTime = performance.now()
      const touch = e.touches[0]
      const rect = canvas.getBoundingClientRect()
      targetMouse.x = (touch.clientX - rect.left) * (canvas.width / rect.width)
      targetMouse.y = (touch.clientY - rect.top) * (canvas.height / rect.height)
    }

    // Mobile device orientation / gyroscope tilt
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null) {
        // gamma: left/right [-90, 90], beta: front/back [-180, 180]
        const clampedGamma = Math.max(-45, Math.min(45, e.gamma))
        const clampedBeta = Math.max(0, Math.min(60, e.beta - 30)) // normalized for holding phone
        gyroOffset.x = (clampedGamma / 45) * canvas.width * 0.35
        gyroOffset.y = (clampedBeta / 60) * canvas.height * 0.25
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('touchstart', handleTouch, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true })
    }

    // Intersection observer to only render when visible
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    }, { threshold: 0.1 })
    observer.observe(canvas)

    // Render loop
    const render = () => {
      if (isVisible) {
        const now = performance.now()
        const currentTime = (now - startTime) * 0.001

        // If no user touch/mouse recently, animate an ambient floating wave
        const timeSinceInteraction = now - lastUserInteractionTime
        if (timeSinceInteraction > 1200) {
          const ambientX = canvas.width * 0.5 + Math.sin(currentTime * 0.75) * (canvas.width * 0.28) + gyroOffset.x
          const ambientY = canvas.height * 0.5 + Math.cos(currentTime * 0.95) * (canvas.height * 0.2) + gyroOffset.y
          targetMouse.x = ambientX
          targetMouse.y = ambientY
        } else {
          targetMouse.x += gyroOffset.x * 0.05
          targetMouse.y += gyroOffset.y * 0.05
        }

        // Smooth cursor interpolation
        mouse.x += (targetMouse.x - mouse.x) * 0.08
        mouse.y += (targetMouse.y - mouse.y) * 0.08

        gl.uniform2f(uResolutionLoc, canvas.width, canvas.height)
        gl.uniform2f(uMouseLoc, mouse.x, mouse.y)
        gl.uniform1f(uTimeLoc, currentTime)
        gl.uniform1f(uIntensityLoc, intensity)

        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }
      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchstart', handleTouch)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('deviceorientation', handleOrientation)
      observer.disconnect()
      gl.deleteProgram(program)
      gl.deleteShader(vertexShader)
      gl.deleteShader(fragmentShader)
    }
  }, [intensity])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full block pointer-events-none select-none ${className}`}
      style={{ imageRendering: 'auto' }}
    />
  )
}
