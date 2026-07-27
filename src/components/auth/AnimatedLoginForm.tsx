'use client'

import {
  memo,
  ReactNode,
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  forwardRef,
} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  motion,
  useAnimation,
  useInView,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'
import {
  Eye,
  EyeOff,
  Users,
  ReceiptText,
  KanbanSquare,
  Filter,
  PanelsTopLeft,
  Calendar,
  BadgeCheck,
  DollarSign,
  Building2,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ==================== Input Component ====================

const Input = memo(
  forwardRef(function Input(
    { className, type, ...props }: React.InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) {
    const radius = 100
    const [visible, setVisible] = useState(false)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - left)
      mouseY.set(clientY - top)
    }

    return (
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + 'px' : '0px'} circle at ${mouseX}px ${mouseY}px,
          #0e91e8,
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/input rounded-xl p-[2px] transition duration-300"
      >
        <input
          type={type}
          className={cn(
            'flex h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-900 shadow-sm transition duration-200 group-hover/input:shadow-none placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus-visible:ring-blue-400',
            className
          )}
          ref={ref}
          {...props}
        />
      </motion.div>
    )
  })
)

Input.displayName = 'Input'

// ==================== BoxReveal Component ====================

type BoxRevealProps = {
  children: ReactNode
  width?: string
  boxColor?: string
  duration?: number
  overflow?: string
  position?: string
  className?: string
}

const BoxReveal = memo(function BoxReveal({
  children,
  width = 'fit-content',
  boxColor,
  duration,
  overflow = 'hidden',
  position = 'relative',
  className,
}: BoxRevealProps) {
  const mainControls = useAnimation()
  const slideControls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      slideControls.start('visible')
      mainControls.start('visible')
    } else {
      slideControls.start('hidden')
      mainControls.start('hidden')
    }
  }, [isInView, mainControls, slideControls])

  return (
    <section
      ref={ref}
      style={{
        position: position as
          | 'relative'
          | 'absolute'
          | 'fixed'
          | 'sticky'
          | 'static',
        width,
        overflow,
      }}
      className={className}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: duration ?? 0.5, delay: 0.25 }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{ hidden: { left: 0 }, visible: { left: '100%' } }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: duration ?? 0.5, ease: 'easeIn' }}
        style={{
          position: 'absolute',
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
          zIndex: 20,
          background: boxColor ?? '#0e91e8',
          borderRadius: 4,
        }}
      />
    </section>
  )
})

// ==================== Ripple Component ====================

type RippleProps = {
  mainCircleSize?: number
  mainCircleOpacity?: number
  numCircles?: number
  className?: string
}

const Ripple = memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.24,
  numCircles = 9,
  className = '',
}: RippleProps) {
  return (
    <section
      className={`absolute inset-0 flex items-center justify-center overflow-hidden
        [mask-image:linear-gradient(to_bottom,black,transparent)] ${className}`}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 65
        const opacity = mainCircleOpacity - i * 0.025
        const animationDelay = `${i * 0.06}s`
        const borderStyle = i === numCircles - 1 ? 'dashed' : 'solid'

        return (
          <span
            key={i}
            className="absolute animate-ripple rounded-full border border-blue-500/20 bg-blue-500/5"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: opacity,
              animationDelay: animationDelay,
              borderStyle: borderStyle,
              borderWidth: '1px',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        )
      })}
    </section>
  )
})

// ==================== OrbitingCircles Component ====================

type OrbitingCirclesProps = {
  className?: string
  children: ReactNode
  reverse?: boolean
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
}

const OrbitingCircles = memo(function OrbitingCircles({
  className,
  children,
  reverse = false,
  duration = 20,
  delay = 10,
  radius = 50,
  path = true,
}: OrbitingCirclesProps) {
  return (
    <>
      {path && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="pointer-events-none absolute inset-0 size-full"
        >
          <circle
            className="stroke-blue-400/20 stroke-1"
            cx="50%"
            cy="50%"
            r={radius}
            fill="none"
          />
        </svg>
      )}
      <section
        style={
          {
            '--duration': duration,
            '--radius': radius,
            '--delay': -delay,
          } as React.CSSProperties
        }
        className={cn(
          'absolute flex size-full transform-gpu animate-orbit items-center justify-center rounded-full border border-blue-200/40 bg-blue-50/20 [animation-delay:calc(var(--delay)*1000ms)]',
          { '[animation-direction:reverse]': reverse },
          className
        )}
      >
        {children}
      </section>
    </>
  )
})

// ==================== Icon Badge Wrapper for CRM Icons ====================

function CrmIconBadge({
  Icon,
  label,
  color,
}: {
  Icon: React.ElementType
  label: string
  color: string
}) {
  return (
    <div className="group relative flex items-center justify-center p-3 rounded-2xl bg-white border border-slate-200/80 shadow-md transition-all duration-300 hover:scale-115 hover:shadow-lg">
      <Icon className={`h-6 w-6 ${color}`} />
      <span className="absolute -bottom-8 whitespace-nowrap rounded-md bg-slate-900 px-2 py-1 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 shadow-sm pointer-events-none">
        {label}
      </span>
    </div>
  )
}

// ==================== TechOrbitDisplay (CRM Orbit Display) ====================

type IconConfig = {
  className?: string
  duration?: number
  delay?: number
  radius?: number
  path?: boolean
  reverse?: boolean
  component: () => React.ReactNode
}

const CRM_ICONS: IconConfig[] = [
  // Outer Orbit (Radius 220) - Client Management & CRM Leads
  {
    duration: 30,
    radius: 210,
    delay: 0,
    component: () => (
      <CrmIconBadge Icon={Users} label="Client Management" color="text-blue-600" />
    ),
  },
  {
    duration: 30,
    radius: 210,
    delay: 10,
    component: () => (
      <CrmIconBadge Icon={Filter} label="Lead Pipeline" color="text-indigo-600" />
    ),
  },
  {
    duration: 30,
    radius: 210,
    delay: 20,
    component: () => (
      <CrmIconBadge Icon={KanbanSquare} label="Project Boards" color="text-sky-600" />
    ),
  },
  // Inner Orbit (Radius 130) - Invoices, Portals & Meetings
  {
    duration: 20,
    radius: 130,
    delay: 0,
    reverse: true,
    component: () => (
      <CrmIconBadge Icon={ReceiptText} label="GST Invoicing" color="text-emerald-600" />
    ),
  },
  {
    duration: 20,
    radius: 130,
    delay: 7,
    reverse: true,
    component: () => (
      <CrmIconBadge Icon={PanelsTopLeft} label="Client Portal" color="text-purple-600" />
    ),
  },
  {
    duration: 20,
    radius: 130,
    delay: 14,
    reverse: true,
    component: () => (
      <CrmIconBadge Icon={BadgeCheck} label="Verified Reviews" color="text-amber-500" />
    ),
  },
]

type CRMOrbitDisplayProps = {
  iconsArray?: IconConfig[]
  quote?: string
}

const CRMOrbitDisplay = memo(function CRMOrbitDisplay({
  iconsArray = CRM_ICONS,
  quote = 'Built for modern businesses that never stop growing.',
}: CRMOrbitDisplayProps) {
  return (
    <section className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-3xl bg-slate-950 p-8 border border-slate-800/90 shadow-2xl">
      <Ripple />

      {/* Orbiting CRM Icons */}
      {iconsArray.map((icon, index) => (
        <OrbitingCircles
          key={index}
          className={icon.className}
          duration={icon.duration}
          delay={icon.delay}
          radius={icon.radius}
          path={icon.path}
          reverse={icon.reverse}
        >
          {icon.component()}
        </OrbitingCircles>
      ))}

      {/* Central Quote Container */}
      <div className="relative z-10 max-w-md text-center p-6 sm:p-8 rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 shadow-2xl">
        <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
          Kliv∞ Client OS
        </span>
        <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold leading-tight text-white tracking-tight">
          &ldquo;{quote}&rdquo;
        </h3>
        <p className="mt-3 text-xs text-slate-400 font-medium">
          Unified client profiles, lead tracking, GST invoicing &amp; white-label portals.
        </p>
      </div>
    </section>
  )
})

// ==================== AnimatedForm Component ====================

type FieldType = 'text' | 'email' | 'password'

type Field = {
  label: string
  required?: boolean
  type: FieldType
  placeholder?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

type AnimatedFormProps = {
  header: string
  subHeader?: string
  fields: Field[]
  submitButton: string
  textVariantButton?: string
  errorField?: string
  fieldPerRow?: number
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  googleLogin?: string
  goTo?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

type Errors = {
  [key: string]: string
}

const AnimatedForm = memo(function AnimatedForm({
  header,
  subHeader,
  fields,
  submitButton,
  textVariantButton,
  errorField,
  fieldPerRow = 1,
  onSubmit,
  googleLogin,
  goTo,
}: AnimatedFormProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const [errors, setErrors] = useState<Errors>({})

  const toggleVisibility = () => setVisible(!visible)

  const validateForm = (event: FormEvent<HTMLFormElement>) => {
    const currentErrors: Errors = {}
    fields.forEach((field) => {
      const value = (event.target as HTMLFormElement)[field.label]?.value

      if (field.required && !value) {
        currentErrors[field.label] = `${field.label} is required`
      }

      if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
        currentErrors[field.label] = 'Invalid email address'
      }

      if (field.type === 'password' && value && value.length < 6) {
        currentErrors[field.label] =
          'Password must be at least 6 characters long'
      }
    })
    return currentErrors
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formErrors = validateForm(event)

    if (Object.keys(formErrors).length === 0) {
      onSubmit(event)
      console.log('Form submitted')
    } else {
      setErrors(formErrors)
    }
  }

  return (
    <section className="flex flex-col gap-4 w-full max-w-sm mx-auto">
      <BoxReveal boxColor="#0e91e8" duration={0.3}>
        <h2 className="font-extrabold text-3xl tracking-tight text-slate-900 dark:text-white">
          {header}
        </h2>
      </BoxReveal>

      {subHeader && (
        <BoxReveal boxColor="#0e91e8" duration={0.3} className="pb-2">
          <p className="text-slate-600 text-sm max-w-sm dark:text-slate-300 font-medium">
            {subHeader}
          </p>
        </BoxReveal>
      )}

      {googleLogin && (
        <>
          <BoxReveal
            boxColor="#0e91e8"
            duration={0.3}
            overflow="visible"
            width="100%"
          >
            <button
              className="g-button group/btn bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 w-full rounded-xl h-11 font-semibold text-sm text-slate-700 dark:text-slate-200 outline-none hover:bg-slate-50 transition-colors shadow-sm cursor-pointer"
              type="button"
              onClick={() => console.log('Google login clicked')}
            >
              <span className="flex items-center justify-center w-full h-full gap-3">
                <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                {googleLogin}
              </span>
              <BottomGradient />
            </button>
          </BoxReveal>

          <BoxReveal boxColor="#0e91e8" duration={0.3} width="100%">
            <section className="flex items-center gap-4 py-1">
              <hr className="flex-1 border-1 border-dashed border-slate-300 dark:border-slate-700" />
              <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
                or
              </p>
              <hr className="flex-1 border-1 border-dashed border-slate-300 dark:border-slate-700" />
            </section>
          </BoxReveal>
        </>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field) => (
          <section key={field.label} className="flex flex-col gap-1.5">
            <BoxReveal boxColor="#0e91e8" duration={0.3}>
              <Label htmlFor={field.label} className="text-slate-700 dark:text-slate-300 font-semibold text-xs">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
            </BoxReveal>

            <BoxReveal
              width="100%"
              boxColor="#0e91e8"
              duration={0.3}
              className="flex flex-col space-y-1 w-full"
            >
              <section className="relative">
                <Input
                  type={
                    field.type === 'password'
                      ? visible
                        ? 'text'
                        : 'password'
                      : field.type
                  }
                  id={field.label}
                  placeholder={field.placeholder}
                  onChange={field.onChange}
                />

                {field.type === 'password' && (
                  <button
                    type="button"
                    onClick={toggleVisibility}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                  >
                    {visible ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                )}
              </section>

              {errors[field.label] && (
                <p className="text-red-500 text-xs mt-1 font-medium">
                  {errors[field.label]}
                </p>
              )}
            </BoxReveal>
          </section>
        ))}

        {errorField && (
          <BoxReveal width="100%" boxColor="#0e91e8" duration={0.3}>
            <p className="text-red-500 text-sm">{errorField}</p>
          </BoxReveal>
        )}

        <BoxReveal
          width="100%"
          boxColor="#0e91e8"
          duration={0.3}
          overflow="visible"
        >
          <button
            className="relative group/btn bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 block w-full text-white font-bold rounded-xl h-11 text-sm shadow-md transition-all cursor-pointer"
            type="submit"
          >
            {submitButton} &rarr;
            <BottomGradient />
          </button>
        </BoxReveal>

        {textVariantButton && goTo && (
          <BoxReveal boxColor="#0e91e8" duration={0.3} width="100%">
            <section className="mt-3 text-center">
              <button
                type="button"
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer outline-none"
                onClick={goTo}
              >
                {textVariantButton}
              </button>
            </section>
          </BoxReveal>
        )}
      </form>
    </section>
  )
})

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-blue-400 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
    </>
  )
}

// ==================== Label Component ====================

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  htmlFor?: string
}

const Label = memo(function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
})

// ==================== Exports ====================

export {
  Input,
  BoxReveal,
  Ripple,
  OrbitingCircles,
  CRMOrbitDisplay,
  AnimatedForm,
  Label,
  BottomGradient,
}
