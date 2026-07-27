'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from './button';
import {
	AppleIcon,
	AtSignIcon,
	ChevronLeftIcon,
	GithubIcon,
	TrendingUp,
	Users,
	KanbanSquare,
	ReceiptText,
	CheckCircle2,
	ArrowRight,
} from 'lucide-react';
import { Input } from './input';

interface AuthPageProps {
	mode?: 'login' | 'signup';
	quote?: string;
	author?: string;
}

export function AuthPage({
	mode = 'login',
}: AuthPageProps) {
	return (
		<main className="relative min-h-screen font-sans bg-[radial-gradient(circle_at_top_left,_rgba(37,99,235,0.08),_transparent_35%),linear-gradient(180deg,_#ffffff_0%,_#f8fafc_50%,_#f1f5f9_100%)] text-slate-900 flex flex-col justify-between overflow-x-hidden">
			{/* 🌌 Background Grid Animation: 40s infinite linear diagonal 20px x 20px, 7% opacity */}
			<motion.div
				animate={{ backgroundPosition: ['0px 0px', '20px 20px'] }}
				transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
				className="absolute inset-0 bg-grid-dark opacity-[0.07] pointer-events-none z-0"
			/>

			{/* Top Bar Navigation: Prominent Home Button */}
			<header className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
				<Link href="/" className="group flex items-center gap-3">
					<Image
						src="/klivoo logo.png"
						alt="Kliv∞ logo"
						width={260}
						height={68}
						className="h-12 sm:h-14 w-auto transition-transform group-hover:scale-105"
						priority
					/>
				</Link>

				{/* Home Button Always Visible */}
				<Link
					href="/"
					className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white px-5 py-2.5 text-sm font-extrabold text-slate-800 shadow-sm transition-all hover:bg-stone-50 hover:text-blue-600 hover:border-blue-300 hover:shadow-md"
				>
					<ChevronLeftIcon className="h-4 w-4 text-blue-600" />
					<span>Back to Home</span>
				</Link>
			</header>

			{/* Main Grid Workspace */}
			<div className="relative z-10 mx-auto my-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
				
				{/* Left Column - 3D Perspective Floating CRM Preview & Animations (6 Cols) */}
				<div className="relative hidden h-full flex-col justify-center lg:flex lg:col-span-6 overflow-hidden">
					{/* 💙 Breathing Blue Radial Glow */}
					<motion.div
						animate={{
							scale: [1, 1.08, 1],
							opacity: [0.55, 0.75, 0.55],
						}}
						transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
						className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[520px] rounded-full bg-gradient-to-tr from-blue-600/35 via-cyan-400/25 to-indigo-600/35 blur-[100px]"
					/>

					{/* 3D Perspective Canvas Container */}
					<div className="relative w-full max-w-lg mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20, rotateX: 12, rotateY: -12 }}
							animate={{ opacity: 1, y: 0, rotateX: 6, rotateY: -8 }}
							transition={{ duration: 1, ease: 'easeOut' }}
							style={{ transformStyle: 'preserve-3d' }}
							className="relative w-full rounded-2xl border border-slate-800/90 bg-slate-950/90 p-5 shadow-[0_30px_100px_-20px_rgba(14,145,232,0.35)] backdrop-blur-2xl text-slate-100"
						>
							{/* Top Workspace App Bar */}
							<div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
								<div className="flex items-center gap-2">
									<span className="h-3 w-3 rounded-full bg-red-500/80" />
									<span className="h-3 w-3 rounded-full bg-amber-500/80" />
									<span className="h-3 w-3 rounded-full bg-emerald-500/80" />
									<span className="ml-2 text-xs font-mono font-semibold text-slate-300">app.kliv∞.in/dashboard</span>
								</div>
								<div className="flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
									<span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
									Live Syncing
								</div>
							</div>

							{/* Interactive Mini Widgets Grid */}
							<div className="grid grid-cols-12 gap-3">
								{/* Revenue Analytics Widget */}
								<div className="col-span-7 rounded-xl bg-slate-900/90 border border-white/5 p-3.5">
									<div className="flex items-center justify-between text-xs text-slate-400">
										<span>Monthly Revenue</span>
										<span className="flex items-center gap-1 font-bold text-emerald-400">+34.8% <TrendingUp className="h-3 w-3" /></span>
									</div>
									<div className="mt-1 text-xl font-extrabold text-white">₹1,42,800.00</div>
									{/* Sparkline Bar Graph */}
									<div className="mt-3 flex items-end gap-1.5 h-10 pt-2 border-t border-white/5">
										{[40, 65, 45, 80, 95, 70, 100].map((height, i) => (
											<div
												key={i}
												style={{ height: `${height}%` }}
												className="flex-1 rounded-sm bg-gradient-to-t from-blue-600 to-cyan-400 opacity-90"
											/>
										))}
									</div>
								</div>

								{/* Active Leads & Tasks Card */}
								<div className="col-span-5 flex flex-col justify-between rounded-xl bg-slate-900/90 border border-white/5 p-3.5">
									<div className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Deals</div>
									<div className="mt-1 flex items-center justify-between">
										<div className="text-lg font-bold text-white">18 Leads</div>
										<div className="flex -space-x-2">
											<div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-[9px] font-bold ring-2 ring-slate-900">JD</div>
											<div className="h-6 w-6 rounded-full bg-amber-500 flex items-center justify-center text-[9px] font-bold ring-2 ring-slate-900">SK</div>
											<div className="h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center text-[9px] font-bold ring-2 ring-slate-900">+4</div>
										</div>
									</div>
									<div className="mt-2 text-[11px] text-slate-400 flex items-center gap-1">
										<CheckCircle2 className="h-3 w-3 text-blue-400" /> 4 Invoices Pending
									</div>
								</div>

								{/* Kanban Board Row */}
								<div className="col-span-12 rounded-xl bg-slate-900/90 border border-white/5 p-3">
									<div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2">
										<span className="flex items-center gap-1.5"><KanbanSquare className="h-3.5 w-3.5 text-blue-400" /> Pipeline Kanban</span>
										<span className="text-[10px] text-slate-400 font-mono">Updated just now</span>
									</div>
									<div className="grid grid-cols-2 gap-2">
										<div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
											<div className="text-xs font-bold text-white truncate">Acme Corp Rebrand</div>
											<div className="text-[11px] text-blue-400 font-medium">₹45,000 • Proposal Sent</div>
										</div>
										<div className="rounded-lg bg-slate-950 p-2 border border-slate-800">
											<div className="text-xs font-bold text-white truncate">Starlight App UI</div>
											<div className="text-[11px] text-emerald-400 font-medium">₹85,000 • Paid GST</div>
										</div>
									</div>
								</div>
							</div>
						</motion.div>

						{/* ✨ Floating CRM Card 1: Invoice Card (Y: 0 -> -10px -> 0, Rotate: 0 -> 1deg -> 0, 5s easeInOut) */}
						<motion.div
							animate={{
								y: [0, -10, 0],
								rotate: [0, 1, 0],
							}}
							transition={{
								duration: 5,
								ease: 'easeInOut',
								repeat: Infinity,
							}}
							className="absolute -top-6 -right-4 z-30 rounded-xl bg-slate-900/95 border border-emerald-500/30 px-4 py-2.5 shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs text-white"
						>
							<div className="h-9 w-9 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
								<ReceiptText className="h-4 w-4" />
							</div>
							<div>
								<div className="text-[10px] text-slate-400 font-semibold uppercase">GST Invoice Auto-Sent</div>
								<div className="font-bold text-emerald-400">₹1,45,000 • Received</div>
							</div>
						</motion.div>

						{/* ✨ Floating CRM Card 2: Lead Card (Y: 0 -> +8px -> 0, Rotate: 0 -> -1deg -> 0, 6.5s delay 1s easeInOut) */}
						<motion.div
							animate={{
								y: [0, 8, 0],
								rotate: [0, -1, 0],
							}}
							transition={{
								duration: 6.5,
								delay: 1,
								ease: 'easeInOut',
								repeat: Infinity,
							}}
							className="absolute -bottom-6 -left-4 z-30 rounded-xl bg-slate-900/95 border border-blue-500/30 px-4 py-2.5 shadow-2xl backdrop-blur-xl flex items-center gap-3 text-xs text-white"
						>
							<div className="h-9 w-9 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
								<Users className="h-4 w-4" />
							</div>
							<div>
								<div className="text-[10px] text-slate-400 font-semibold uppercase">New Lead Converted</div>
								<div className="font-bold text-white">Acme Labs • 98% Match</div>
							</div>
						</motion.div>
					</div>
				</div>

				{/* Right Column - BIGGER Login Card Matching Home Page UI (6 Cols) */}
				<div className="relative flex flex-col justify-center lg:col-span-6 z-10 py-6">
					
					{/* Bigger Glass Login Card matching Home Page light UI theme & 24px radius */}
					<div
						style={{
							background: 'rgba(255, 255, 255, 0.85)',
							backdropFilter: 'blur(24px)',
							border: '1px solid rgba(226, 232, 240, 0.9)',
						}}
						className="mx-auto w-full max-w-xl rounded-[24px] p-8 sm:p-12 lg:p-14 shadow-[0_30px_90px_-20px_rgba(15,23,42,0.12)] transition-all"
					>
						<div className="flex flex-col space-y-2 mb-8">
							<h1 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
								{mode === 'login' ? 'Welcome back' : 'Create Account'}
							</h1>
							<p className="text-slate-600 text-base font-medium">
								{mode === 'login'
									? 'Sign in to access your Kliv∞ workspace'
									: 'Get started free in less than 5 minutes'}
							</p>
						</div>

						{/* Social Login Actions - Home Page light button styling */}
						<div className="space-y-3">
							<Button type="button" size="lg" className="w-full bg-white border border-stone-200 text-slate-800 hover:bg-stone-50 font-semibold rounded-2xl h-12 text-base flex items-center justify-center transition-all shadow-sm">
								<GoogleIcon className='size-5 me-3' />
								Continue with Google
							</Button>
							<Button type="button" size="lg" className="w-full bg-white border border-stone-200 text-slate-800 hover:bg-stone-50 font-semibold rounded-2xl h-12 text-base flex items-center justify-center transition-all shadow-sm">
								<AppleIcon className='size-5 me-3 text-slate-900' />
								Continue with Apple
							</Button>
							<Button type="button" size="lg" className="w-full bg-white border border-stone-200 text-slate-800 hover:bg-stone-50 font-semibold rounded-2xl h-12 text-base flex items-center justify-center transition-all shadow-sm">
								<GithubIcon className='size-5 me-3 text-slate-900' />
								Continue with GitHub
							</Button>
						</div>

						<AuthSeparator />

						{/* Email Form - Home Page Input & Action Button styling */}
						<form className="space-y-5" onSubmit={(e) => { e.preventDefault(); window.location.href = '/dashboard'; }}>
							<div className="space-y-2">
								<label className="text-xs font-bold uppercase tracking-wider text-slate-700">
									Email Address
								</label>
								<div className="relative h-max">
									<Input
										placeholder="your.email@company.com"
										className="peer ps-10 bg-white border-stone-200 text-slate-900 placeholder:text-stone-400 rounded-2xl h-12 text-base focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20 transition-all font-medium shadow-sm"
										type="email"
										required
									/>
									<div className="text-stone-400 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3.5 peer-disabled:opacity-50">
										<AtSignIcon className="size-5" aria-hidden="true" />
									</div>
								</div>
							</div>

							{/* Requested CTA: Enter Workspace → */}
							<Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold h-13 py-3.5 rounded-2xl shadow-xl shadow-blue-500/25 transition-all text-lg flex items-center justify-center gap-2">
								<span>{mode === 'login' ? 'Enter Workspace' : 'Open Dashboard'}</span>
								<ArrowRight className="h-5 w-5" />
							</Button>
						</form>

						{/* Switch between Login and Signup */}
						<div className="pt-6 text-center text-base text-slate-600 font-medium">
							{mode === 'login' ? (
								<p>
									Don&apos;t have an account?{' '}
									<Link href="/signup" className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">
										Start Free
									</Link>
								</p>
							) : (
								<p>
									Already have an account?{' '}
									<Link href="/login" className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4">
										Sign in
									</Link>
								</p>
							)}
						</div>

						<p className="text-slate-500 mt-6 text-xs text-center">
							By clicking continue, you agree to our{' '}
							<a
								href="#"
								className="hover:text-blue-600 underline underline-offset-4"
							>
								Terms of Service
							</a>{' '}
							and{' '}
							<a
								href="#"
								className="hover:text-blue-600 underline underline-offset-4"
							>
								Privacy Policy
							</a>
							.
						</p>
					</div>
				</div>
			</div>

			{/* Footer Copyright Bar */}
			<footer className="relative z-20 py-4 text-center text-xs font-semibold text-slate-500">
				&copy; 2026 Kliv∞. Operating platform built by Tenspick Labs.
			</footer>
		</main>
	);
}

const GoogleIcon = (props: React.ComponentProps<'svg'>) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
		{...props}
	>
		<g>
			<path d="M12.479,14.265v-3.279h11.049c0.108,0.571,0.164,1.247,0.164,1.979c0,2.46-0.672,5.502-2.84,7.669   C18.744,22.829,16.051,24,12.483,24C5.869,24,0.308,18.613,0.308,12S5.869,0,12.483,0c3.659,0,6.265,1.436,8.223,3.307L18.392,5.62   c-1.404-1.317-3.307-2.341-5.913-2.341C7.65,3.279,3.873,7.171,3.873,12s3.777,8.721,8.606,8.721c3.132,0,4.916-1.258,6.059-2.401   c0.927-0.927,1.537-2.251,1.777-4.059L12.479,14.265z" />
		</g>
	</svg>
);

const AuthSeparator = () => {
	return (
		<div className="flex w-full items-center justify-center my-5">
			<div className="bg-stone-200 h-px w-full" />
			<span className="text-stone-400 px-3 text-xs font-semibold uppercase">OR</span>
			<div className="bg-stone-200 h-px w-full" />
		</div>
	);
};
